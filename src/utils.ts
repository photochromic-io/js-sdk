import { VerificationStatus } from "./Contracts";

export function indexToVerificationStatus(n: number): VerificationStatus {
    switch (n) {
        case (0): return VerificationStatus.VERIFIED;
        case (1): return VerificationStatus.UNVERIFIED;
        case (2): return VerificationStatus.INVALID;
        default: throw new Error(`unknown verification status ${n}`);
    };
}
