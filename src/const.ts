export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZERO_NODE = "0x0000000000000000000000000000000000000000000000000000000000000000";

const KYC_PREFIX = "io.photochromic";

export type ContractConfig = {
    // The address of the avatar support library contract.
    avatarSupportAddress: string,
    // The address of the version tracker contract.
    versionTrackerAddress: string,
    // Major version number.
    major: number,
    // Minor version number.
    minor: number
};

const AVATAR_SUPPORT_ADDRESS = "0x3f1201A271201529877b66f10A0AB5687c12e5E9";
const VERSION_TRACKER_ADDRESS = "0x5C20d97eC62779906A368Ed33c1E8919593D9581";
const VERSION_MAJOR = 0;
const VERSION_MINOR = 0;

export const MAINNET_CONFIG: ContractConfig = {
    avatarSupportAddress: AVATAR_SUPPORT_ADDRESS,
    versionTrackerAddress: VERSION_TRACKER_ADDRESS,
    major: VERSION_MAJOR,
    minor: VERSION_MINOR
}

export const KYC_FIRST_NAME_KEY = `${KYC_PREFIX}.firstname`;
export const KYC_LAST_NAME_KEY = `${KYC_PREFIX}.lastname`;
export const KYC_EMAIL_KEY = `${KYC_PREFIX}.email`;
export const KYC_BIRTH_DATE_KEY = `${KYC_PREFIX}.birthdate`;
export const KYC_NATIONALITY_KEY = `${KYC_PREFIX}.nationality`;
