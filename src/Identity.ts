import { Provider } from "@ethersproject/providers";
import { namehash } from "ethers/lib/utils";
import { ContractConfig, KYC_BIRTH_DATE_KEY, KYC_EMAIL_KEY, KYC_FIRST_NAME_KEY, KYC_LAST_NAME_KEY, KYC_NATIONALITY_KEY, ZERO_ADDRESS, ZERO_NODE } from "./const";
import { Contracts, initContracts, Node, Profile, ValidatedAddrRecord, ValidatedTextRecord, ValidityDates } from "./Contracts";

/**
 * An individual component of a name, such as `john`.
 */
export type Label = string;

/**
 * An ENS identifier such as `john.photochromic.eth`. Names may consist of multiple parts, called labels, separated by dots.
 */
export type Name = string;

/**
 * A collection of the KYC data of a user.
 */
export type KYCData = {
    // The first name of the user.
    firstName: string;
    // The last name of the user.
    lastName: string;
    // The (KYC) email address of the user.
    email: string;
    // The birth date of the user.
    birthDate: string;
    // The nationality of the user.
    nationality: string;
}

export enum AvatarType {
    // Indicates that the user identity holds a CAIP19 'bluechip' NFT.
    HOLDS_BLUECHIP_NFT,
    // Indicates that the user identity holds a CAIP19 NFT.
    HOLDS,
    // Indicates that the user does not hold a CAIP19 NFT.
    DOES_NOT_HOLD,

    UNSUPPORTED,
    ERROR
}

/**
 * Returns a new Identity instance that can be used to QUERY data on behalf of the given address.
 *
 * @param address The address of the identity.
 * @param provider The provider used to communicate with the contracts, does not need to match the address.
 * @param [contractConfig] An optional config for the contracts for a certain chain.
 * @returns An initialed Identity class that uses the given address under the hood.
 */
export async function newIdentity(address: string, provider: Provider, contractConfig?: ContractConfig): Promise<Identity> {
    const contracts = await initContracts(provider, contractConfig);
    let node = await contracts.getNodeOfAddress(address);
    if (node == ZERO_NODE) {
        const userId = await contracts.core["getTicketUserId(address)"](address);
        if (userId == "") throw Error(`No node found for address: ${address}`);
        node = namehash(userId)
    };
    const identity = new Identity(address, node);
    await identity.initWithContacts(contracts);
    return identity;
}

export async function newIdentityFromNode(node: Node, provider: Provider, contractConfig?: ContractConfig): Promise<Identity> {
    const contracts = await initContracts(provider, contractConfig);
    let address = await contracts.getOwnerOfNode(node);
    if (address == ZERO_ADDRESS) {
        address = await contracts.core.getTicketAddress(node);
        if (address == ZERO_ADDRESS) throw Error(`No address found for node: ${node}`);
    }
    const identity = new Identity(address, node);
    await identity.initWithContacts(contracts);
    return identity;
}

/**
 * NOTES:
 * @preMint can be called BEFORE the identity was minted (i.e. purchase phase).
 * @postMint can be called AFTER the identity was minted.
 */
export class Identity {

    protected address: string;
    protected node: Node;
    protected contracts: Contracts = {} as Contracts;

    getAddress(): string { return this.address };
    getNode(): Node { return this.node };
    getContracts(): Contracts { return this.contracts };

    constructor(address: string, node: Node) {
        this.address = address;
        this.node = node;
    }

    /**
     * Initializes all the contracts based on the given core address and connects the
     * identity to the underlying contracts.
     */
    async init(provider: Provider, contractConfig?: ContractConfig) {
        this.contracts = await initContracts(provider, contractConfig);
        this.contracts.connect(this.address);
    }

    async initWithContacts(contracts: Contracts) {
        this.contracts = contracts;
        this.contracts.connect(this.address);
    };

    /**
     * @preMint
     *
     * @returns Whether the identity has a ticket.
     */
    async hasTicket(): Promise<boolean> {
        const userId = await this.contracts.core["getTicketUserId(address)"](this.address);
        return userId != "";
    }

    /**
     * @preMint
     *
     * @returns Whether the identity has a valid (unexpired) ticket.
     */
    async hasValidTicket(): Promise<boolean> {
        return this.contracts.isValidTicketOfOwner(this.node, this.address);
    }

    /**
     * @postMint
     *
     * @returns Whether the identity has a minted identity.
     */
    async hasIdentity(): Promise<boolean> {
        const node = await this.contracts.registrar.getNode(this.address);
        return node != ZERO_NODE;
    }

    /**
     * @preMint
     *
     * @returns The profile for which a ticket was bought.
     */
    async myTicketProfile(): Promise<Profile> {
        const [profileName, years] = await this.contracts.core.getTicketProfile()
        return this.contracts.getProfile(profileName, years);
    }

    /**
     * @preMint
     *
     * @returns The full user identity.
     */
    async myTicketUserId(): Promise<string> {
        return this.contracts.core["getTicketUserId()"]();
    }

    /**
     * @postMint
     * 
     * @returns The full user identity.
     */
    async myUserId(): Promise<string> {
        return this.contracts.getTextRecord(this.node, "io.photochromic.userid");
    }

    /**
     * @postMint
     *
     * @returns The identity's last liveness check.
     */
    async myLivenessDate(): Promise<Date> {
        const { liveness } = await this.myValidityDates();
        return liveness;
    }

    /**
     * @postMint
     *
     * @returns The identity's expiry date.
     */
    async myExpiryDate(): Promise<Date> {
        const { expiry } = await this.myValidityDates();
        return expiry;
    }

    /**
     * @postMint
     *
     * @returns All validity dates linked to the identity.
     */
    async myValidityDates(): Promise<ValidityDates> {
        return this.contracts.getValidity(this.node);
    };

    /**
     * @postMint
     *
     * @returns The token URI of the (minted) identity.
     */
    async myTokenURI(): Promise<string> {
        return this.contracts.getTokenURI(this.address);
    }

    /**
     * @postMint
     * Returns the value of the given node, associated with the given key.
     *
     * @param key The key used to query the value.
     * @returns The value associated with the given key, returns an empty string if not set.
     */
    async myTextRecord(key: string): Promise<string> {
        return await this.contracts.getTextRecord(this.node, key);
    }

    /**
     * @postMint
     * An extended version of `getTextRecord`, also returns whether the text
     * record is verified or not.
     *
     * @param key The key used to query the value.
     * @returns The record associated with the given key, returns an empty string if not set.
     */
    async myValidatedTextRecord(key: string): Promise<ValidatedTextRecord> {
        return this.contracts.getValidatedTextRecord(this.node, key);
    }

    /**
     * @postMint
     * Returns the address of the given node, associated with the given coinType.
     *
     * @param coinType The coin type used to query the value. Default: 60 (ETH).
     * @returns The address associated with the given key, returns an empty string if not set.
     */
    async myAddressRecord(coinType?: number): Promise<string> {
        if (coinType) return this.contracts.resolver["addr(bytes32,uint256)"](this.node, coinType);
        return this.contracts.resolver["addr(bytes32)"](this.node);
    }

    /**
     * @postMint
     * An extended version of `getAddressRecord`, also returns whether the address
     * record is verified or not.
     *
     * @param coinType The coin type used to query the value. Default: 60 (ETH).
     * @returns The record associated with the given key, returns an empty string if not set.
     */
    async myValidatedAddrRecord(coinType?: number): Promise<ValidatedAddrRecord> {
        const key = coinType ? coinType : 60;
        return this.contracts.getValidatedAddressRecord(this.node, key);
    }

    /**
     * @postMint
     * Returns the avatar type.
     */
    async myAvatarType(): Promise<AvatarType> {
        const caip19 = await this.contracts.getTextRecord(this.node, "avatar");
        return this.contracts.avatarSupport.holdsAvatarCaip19(this.address, caip19);
    }

    /**
     * @postMint
     * Returns all the KYC data.
     */
    async myKYCData(): Promise<KYCData> {
        const contracts = this.getContracts();
        return {
            firstName: await contracts.getTextRecord(this.node, KYC_FIRST_NAME_KEY),
            lastName: await contracts.getTextRecord(this.node, KYC_LAST_NAME_KEY),
            email: await contracts.getTextRecord(this.node, KYC_EMAIL_KEY),
            birthDate: await contracts.getTextRecord(this.node, KYC_BIRTH_DATE_KEY),
            nationality: await contracts.getTextRecord(this.node, KYC_NATIONALITY_KEY)
        }
    }
};
