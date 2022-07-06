import { Signature, Signer } from "ethers";
import { ContractConfig, ZERO_NODE } from "./const";
import { Contracts, initContracts, Node } from "./Contracts";
import { namehash } from "ethers/lib/utils";
import { Identity, Name } from "./Identity";

/**
 * Represents KYC data.
 * [first name, last name, email, birth date, nationality].
 */
export type Contents = [string, string, string, string, string];

/**
 * Describes a signed text record.
 */
export type SignedTextRecord = {
    // The key of the text record.
    key: string
    // The value of the validated text record.
    value: string
    // The timestamp of the validation.
    timestamp: number
    // The validation signature.
    sig: Signature
}

/**
 * Describes a signed address record.
 */
export type SignedAddrRecord = {
    // The coin type of the addr record.
    coinType: number
    // The value of the validated addr record.
    value: string
    // The timestamp of the validation.
    timestamp: number
    // The validation signature.
    sig: Signature
}

/**
 * Describes signed KYC data used to mint an identity.
 */
export type PhotoChromicRecord = {
    // The time of the last liveness check.
    livenessTime: number;
    // The KYC contents.
    contents: Contents;
    // The userId (full ens name) that will be minted.
    // e.g. `john.photochromic.eth`.
    userId: string;
    // The ipfsHash to the metadata (incl. avatar).
    ipfsHash: string;
    // The validation signature.
    sig: Signature;
}

/**
* Returns a new IdentitySigner instance that can be used to UPDATE data on behalf of the given signer.
 * @param signer The signer used to communicate with the contracts.
 * @param [contractConfig] An optional config for the contracts for a certain chain.
 * @returns An initialed IdentitySigner class that uses the given signer under the hood.
 */
export async function newIdentitySigner(signer: Signer, contractConfig?: ContractConfig): Promise<IdentitySigner> {
    if (!signer.provider) throw Error(`Signer has no provider: ${signer.provider}`);
    const contracts = await initContracts(signer.provider!, contractConfig);
    const address = await signer.getAddress();
    let node = await contracts.getNodeOfAddress(address);
    if (node == ZERO_NODE) {
        const userId = await contracts.core["getTicketUserId(address)"](address);
        if (userId != "") node = namehash(userId);
    };
    const identity = new IdentitySigner(address, node);
    await identity.initSignerWithContacts(signer, contracts);
    return identity;
}

export class IdentitySigner extends Identity {

    constructor(address: string, node: Node) {
        super(address, node);
    };

    /**
     * Initializes all the contracts based on the given core address and connects the
     * identity to the underlying contracts.
     */
    async initSigner(signer: Signer, contractConfig?: ContractConfig) {
        if (!signer.provider) throw Error(`Signer has no provider: ${signer.provider}`);
        this.contracts = await initContracts(signer.provider, contractConfig);
        this.contracts.connect(signer);
    }

    async initSignerWithContacts(signer: Signer, contracts: Contracts) {
        this.contracts = contracts;
        this.contracts.connect(signer);
    };

    /**
     * Purchases a ticket for the given label.
     *
     * @param userId The fully qualified ENS name, e.g.`john.photochromic.eth`.
     * @param profileName The name of the (price) profile.
     * @param [years=1] The amount of years to register.
     * @returns The user identity (name) linked to the purchased ticket.
     */
    async purchaseTicket(userId: Name, profileName: string, years: number = 1): Promise<string> {
        const profile = await this.contracts.getProfile(profileName, years);
        const tx = await this.contracts.core.purchase(userId, profileName, years, { value: profile.price });
        await tx.wait();
        return this.myTicketUserId();
    }

    /**
     * Mints a new PhotoChromic identity.
     *
     * @param photoChromicRecord A signed record with KYC data.
     * @param texts A list of signed text records.
     * @param addresses A list of signed addr records.
     * @returns The user identity linked to the minted identity.
     */
    async mintIdentity(photoChromicRecord: PhotoChromicRecord, texts: SignedTextRecord[], addresses: SignedAddrRecord[] = []): Promise<Node> {
        const userId = await this.myTicketUserId();
        if (userId == "") throw new Error("Need to buy a ticket first.");
        const tx = await this.contracts.core.mint(photoChromicRecord, texts, addresses, "");
        await tx.wait();
        this.node = await this.contracts.registrar.getNode(this.address);
        return this.node;
    }

    /**
     * Burns the (owned) ticket.
     */
    async burnTicket() {
        const userId = await this.myTicketUserId();
        if (userId === "") throw new Error("Need to buy a ticket first.");
        const tx = await this.contracts.core.burnTicket(namehash(userId));
        await tx.wait();
        this.node = ZERO_NODE;
    }

    /**
     * Burns the whole PhotoChromic identity.
     */
    async burnIdentity() {
        const userId = await this.contracts.getTextRecord(this.node, "io.photochromic.userid");
        const baseNodeString = await this.contracts.registrar.baseNodeString();
        if (userId.endsWith(baseNodeString)) {
            const tx = await this.contracts.core.burn(userId);
            await tx.wait();
        } else {
            const tx = await this.contracts.core.clearRecords();
            await tx.wait();
        }
        this.node = ZERO_NODE;
    }

    /**
     * Sets a text record.
     * NOTE: can overwrite existing validated social records!
     *
     * @param key The key of the record.
     * @param value The value of the record.
     */
    async setText(key: string, value: string) {
        const tx = await this.contracts.resolver.setText(this.node, key, value);
        await tx.wait();
    };

    /**
     * Sets a list of signed (validated) text records.
     * 
     * @param texts A list of signed text records.
     */
    async setValidatedTextRecords(texts: SignedTextRecord[]) {
        const tx = await this.contracts.resolver.setValidatedTextRecords(this.node, texts);
        await tx.wait();
    };

    /**
     * Sets a list of signed (validated) addr records.
     * 
     * @param addresses A list of signed addr records.
     */
    async setValidatedAddrRecords(addresses: SignedAddrRecord[]) {
        const tx = await this.contracts.resolver.setValidatedAddrRecords(this.node, addresses);
        await tx.wait();
    };

    /**
     * Sets a list of signed (validated) text and addr records.
     * 
     * @param texts A list of signed text records.
     * @param addresses A list of signed addr records.
     */
    async setValidatedRecords(texts: SignedTextRecord[], addresses: SignedAddrRecord[]) {
        const tx = await this.contracts.resolver.setValidatedRecords(this.node, texts, addresses);
        await tx.wait();
    };

    /**
     * Sets an address record.
     * NOTE: can overwrite existing validated address records!
     *
     * @param value The value of the record.
     * @param coinType The coinType of the address. Default: 60 (ETH).
     */
    async setAddr(value: string, coinType?: number) {
        const tx = coinType
            ? await this.contracts.resolver["setAddr(bytes32,uint256,bytes)"](this.node, coinType, value)
            : await this.contracts.resolver["setAddr(bytes32,address)"](this.node, value);
        await tx.wait();
    };
}
