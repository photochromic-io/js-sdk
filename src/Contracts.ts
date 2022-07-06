import { Provider } from "@ethersproject/abstract-provider";
import { BigNumber, Contract, Signer } from "ethers";
import { indexToVerificationStatus } from "./utils";

import {
    PhotochromicCore, PhotochromicCore__factory,
    VersionTracker__factory,
    PhotochromicRegistrar, PhotochromicRegistrar__factory,
    PhotochromicResolver, PhotochromicResolver__factory, AvatarSupport, AvatarSupport__factory
} from "./types";
import { ContractConfig, MAINNET_CONFIG } from "./const";

/**
 * Represents an ETH address
 */
export type Address = string;

/**
 * A cryptographic hash uniquely identifying a name.
 */
export type Node = string;

/**
 * Describes the verification status of a record field.
 */
export enum VerificationStatus {
    // Indicates that the record is verified by PhotoChromic.
    VERIFIED,
    // Indicates that the record is NOT verified. The value could have been set
    // to anything, by anyone.
    UNVERIFIED,
    // Indicates that the record did not pass the verification process.
    INVALID
}

/**
 * An abstract representation of any ENS record field. It includes an (optional)
 * timestamp if the record is verified.
 */
export type ValidatedRecord<K, T> = {
    // The key of the record.
    key: K
    // The value of the record.
    value: T
    // The verification status of the record.
    // Default: `UNVERIFIED`.
    status: VerificationStatus
    // A timestamp on which the record was verified.
    // Should be ignored if the record is not `VERIFIED`.
    timestamp: Date
}

/**
 * A verified text record.
 */
export type ValidatedTextRecord = ValidatedRecord<string, string>;

/**
 * A verified address record.
 */
export type ValidatedAddrRecord = ValidatedRecord<number, string>;

/**
 * Represents the (price) profile selected during the creation of a PhotoChromic
 * identity.
 */
export type Profile = {
    // The name of the profile.
    name: string
    // The price of the profile (in ETH).
    price: BigNumber
    // The amount of social handles that are included in the profile.
    info: BigNumber
}
/**
 * A set of validity dates.
 */
export type ValidityDates = {
    // The last liveness time of the identity.
    liveness: Date,
    // The expiry date of the PhotoChromic ENS name.
    expiry: Date,
}

/**
 * Initialized the Contracts class with the given signer or provider.
 *
 * @param provider The provider used to communicate with the contracts.
 * @param [contractConfig] An optional config for the contracts for a certain chain.
 * @returns All PhotoChromic contracts that have been initialized with the given provider.
 */
export async function initContracts(provider: Provider, contractConfig?: ContractConfig): Promise<Contracts> {
    const contracts = new Contracts(provider);
    await contracts.init(contractConfig);
    return contracts;
}

export class Contracts {

    protected provider: Provider;
    private ens: Contract;
    public core: PhotochromicCore;
    public registrar: PhotochromicRegistrar;
    public resolver: PhotochromicResolver;
    public avatarSupport: AvatarSupport;

    constructor(provider: Provider) {
        this.provider = provider;
        this.avatarSupport = {} as AvatarSupport;
        this.core = {} as PhotochromicCore;
        this.registrar = {} as PhotochromicRegistrar;
        this.resolver = {} as PhotochromicResolver;
        this.ens = new Contract(
            "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
            ["function owner(bytes32 node) view returns (address value)"],
            provider
        )
    }

    /**
     * Initializes all the contracts.
     * Both resolver and registrar addresses are queried from the version tracker.
     */
    async init(contractConfig?: ContractConfig) {
        const config = contractConfig ? contractConfig : MAINNET_CONFIG;
        const versionTracker = VersionTracker__factory.connect(config.versionTrackerAddress, this.provider);
        let version = await versionTracker["getVersion(uint256,uint256)"](config.major, config.minor);
        this.core = PhotochromicCore__factory.connect(version.coreLocation, this.provider);
        this.resolver = PhotochromicResolver__factory.connect(version.resolverLocation, this.provider);
        this.registrar = PhotochromicRegistrar__factory.connect(version.registrarLocation, this.provider);
        this.avatarSupport = AvatarSupport__factory.connect(config.avatarSupportAddress, this.provider);
    }

    connect(signerOrProvider: Signer | Provider | string) {
        this.core = this.core.connect(signerOrProvider);
        this.registrar = this.registrar.connect(signerOrProvider);
        this.resolver = this.resolver.connect(signerOrProvider);
    }

    /**
     * Returns the owner of the node based on the ENS registry.
     * 
     * @param node The hash of the name, e.g. `namehash("john.photochromic.eth")`.
     * @returns The owner of the node.
     */
    async getOwnerOfNode(node: Node): Promise<string> {
        return this.ens.owner(node);
    };

    /**
     * Returns the node that owns the given VALIDATED key-value pair.
     * E.g., "com.twitter", "@john" can be owned by a certain node.
     *
     * @param key The key of the text record.
     * @param value The value of the text record.
     * @returns The node corresponding with the given key-value pair.
     */
    async getTextRecordNode(key: string, value: string): Promise<Node> {
        return this.resolver.lookup(key, value);
    }

    /**
     * Returns the value of the given node, associated with the given key.
     *
     * @param node The node (owner) of the record.
     * @param key The key used to query the value.
     * @returns The value associated with the given key, returns an empty string if not set.
     */
    async getTextRecord(node: Node, key: string): Promise<string> {
        return this.resolver.text(node, key);
    }

    /**
     * An extended version of `getTextRecord`, also returns whether the text
     * record is verified or not.
     *
     * @param node The node (owner) of the record.
     * @param key The key used to query the value.
     * @returns The record associated with the given key, returns an empty string if not set.
     */
    async getValidatedTextRecord(node: Node, key: string): Promise<ValidatedTextRecord> {
        const [status, value, timestamp] = await this.resolver.validatedText(node, key);
        return {
            key, value,
            status: indexToVerificationStatus(status),
            timestamp: new Date(timestamp * 1e3)
        };
    }

    /**
     * Returns the address of the given node, associated with the given coinType.
     *
     * @param node The node (owner) of the record.
     * @param coinType The coin type used to query the value. Default: 60 (ETH).
     * @returns The address associated with the given key, returns an empty string if not set.
     */
    async getAddressRecord(node: Node, coinType?: number): Promise<string> {
        if (coinType) return this.resolver["addr(bytes32,uint256)"](node, coinType);
        return this.resolver["addr(bytes32)"](node);
    }

    /**
     * An extended version of `getAddressRecord`, also returns whether the address
     * record is verified or not.
     *
     * @param node The node (owner) of the record.
     * @param coinType The coin type used to query the value. Default: 60 (ETH).
     * @returns The record associated with the given key, returns an empty string if not set.
     */
    async getValidatedAddressRecord(node: Node, coinType?: number): Promise<ValidatedAddrRecord> {
        const key = coinType ? coinType : 60;
        const [status, value, timestamp] = await this.resolver.validatedAddr(node, key);
        return {
            key,
            value,
            status: indexToVerificationStatus(status),
            timestamp: new Date(timestamp * 1e3)
        }
    }

    /**
     * @returns The list of profiles that are supported by the core contract.
     */
    async getProfiles(): Promise<Profile[]> {
        const names = await this.core.getProfileNames();
        let profiles: Profile[] = [];
        for (const name of names) {
            profiles.push(await this.getProfile(name));
        }
        return profiles;
    };

    /**
     * @param profileName The name of the profile.
     * @returns The profile associated with the given name.
     */
    async getProfile(profileName: string, years: number = 1): Promise<Profile> {
        return {
            name: profileName,
            price: await this.core.getPrice(profileName, years),
            info: await this.core.getSocialsAmount(profileName)
        };
    }

    /**
     * @returns The price per (additional) year.
     * e.g. 5 years = profile.price + 4 * pricePerYear.
     */
    async getPricePerYear(): Promise<BigNumber> {
        return this.core.pricePerYear();
    };

    /**
     * Returns all validity dates linked to the given node.
     *
     * @param node The hash of the name, e.g. `namehash("john.photochromic.eth")`.
     * @returns A set of validity dates linked to the given label.
     * @todo: generalize for nodes.
     */
    async getValidity(node: Node): Promise<ValidityDates> {
        const [liveness, expiry] = await this.core.getValidityInfo(node);
        return {
            liveness: new Date(liveness * 1e3),
            expiry: new Date(expiry * 1e3)
        };
    }

    /**
     * @returns The validity period of a ticket.
     */
    async getTicketValidityPeriod(): Promise<number> {
        const period = await this.core.ticketValidity();
        return period.toNumber();
    }

    /**
     * @returns The grace period of a PhotoChromic domain.
     */
    async getGracePeriod(): Promise<number> {
        const period = await this.core.gracePeriod();
        return period.toNumber();
    }

    /**
     * Check whether the given node is still available.
     *
     * @param node The hash of the name, e.g. `namehash("john.photochromic.eth")`.
     * @returns Whether the node is still available to register.
     */
    async isAvailable(node: Node): Promise<boolean> {
        return this.core.available(node);
    }

    /**
     * Returns whether the owner has a valid ticket linked to the given node.
     *
     * @param node The hash of the name, e.g. `namehash("john.photochromic.eth")`.
     * @param owner The owner of the ticket.
     * @returns Whether the given owner of the node has a valid ticket.
     */
    async isValidTicketOfOwner(node: Node, owner: Address): Promise<boolean> {
        return this.core.isValidTicket(node, owner);
    }

    /**
     * Returns whether the given node is still a valid PhotoChromic identity.
     * 
     * @param node The hash of the name, e.g. `namehash("john.photochromic.eth")`.
     * @returns Whether the given node is valid (i.e. not transferred).
     */
    async isValidNode(node: Node): Promise<boolean> {
        return this.resolver.isValidNode(node);
    };

    /**
     * Returns the node associated with the given (owner) address.
     * 
     * @param owner The owner of the node.
     * @returns The node associated with the given address.
     */
    async getNodeOfAddress(owner: Address): Promise<Node> {
        return this.registrar.getNode(owner);
    };

    /**
     * Returns the token identifier of the given address.
     *
     * @param address The owner's address.
     * @throws If the given address has no PhotoChromic NFT.
     * @returns The token identifier linked to the given address.
     */
    async getTokenId(address: Address): Promise<BigNumber> {
        const amount = await this.registrar.balanceOf(address);
        if (!amount.eq(1)) throw new Error("user identity does not own a PhotoChromic NFT");
        return this.registrar.tokenOfOwnerByIndex(address, 0);
    }

    /**
     * Returns the URI linked to the token of the given address.
     *
     * @param address The owner's address.
     * @returns The IPFS URI of the asset linked to the given address.
     */
    async getTokenURI(address: string): Promise<string> {
        const tokenId = await this.getTokenId(address);
        return this.registrar.tokenURI(tokenId);
    }
}
