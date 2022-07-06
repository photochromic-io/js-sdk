/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  PhotochromicCore,
  PhotochromicCoreInterface,
} from "../PhotochromicCore";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract PhotochromicRegistrar",
        name: "_registrar",
        type: "address",
      },
      {
        internalType: "contract PhotochromicResolver",
        name: "_resolver",
        type: "address",
      },
      {
        internalType: "contract ENS",
        name: "_ens",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sigAddr",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expires",
        type: "uint256",
      },
    ],
    name: "NameRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "profile",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "yrs",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Ticket",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "available",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "burnTicket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "clearRecords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ens",
    outputs: [
      {
        internalType: "contract ENS",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "profile",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "yrs",
        type: "uint256",
      },
    ],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProfileNames",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "profile",
        type: "string",
      },
    ],
    name: "getSocialsAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "getTicketAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTicketProfile",
    outputs: [
      {
        internalType: "string",
        name: "profile",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "yrs",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTicketUserId",
    outputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "getTicketUserId",
    outputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "getValidityInfo",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gracePeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "requester",
        type: "address",
      },
    ],
    name: "isValidTicket",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "lastLiveness",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "livenessTime",
            type: "uint32",
          },
          {
            internalType: "string[5]",
            name: "contents",
            type: "string[5]",
          },
          {
            internalType: "string",
            name: "userId",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "ipfsHash",
            type: "bytes32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
            ],
            internalType: "struct EcdsaSig",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct PhotochromicCore.PhotoChromicRecord",
        name: "data",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "key",
            type: "string",
          },
          {
            internalType: "string",
            name: "value",
            type: "string",
          },
          {
            internalType: "uint32",
            name: "timestamp",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
            ],
            internalType: "struct EcdsaSig",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct ValidatedTextRecord[]",
        name: "texts",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "coinType",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "value",
            type: "bytes",
          },
          {
            internalType: "uint32",
            name: "timestamp",
            type: "uint32",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
              },
              {
                internalType: "uint8",
                name: "v",
                type: "uint8",
              },
            ],
            internalType: "struct EcdsaSig",
            name: "sig",
            type: "tuple",
          },
        ],
        internalType: "struct ValidatedAddrRecord[]",
        name: "addrs",
        type: "tuple[]",
      },
      {
        internalType: "string",
        name: "avatar",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "photochromicSignerAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pricePerYear",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "profiles",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint128",
        name: "price",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "info",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "userId",
        type: "string",
      },
      {
        internalType: "string",
        name: "profile",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "yrs",
        type: "uint256",
      },
    ],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "registrar",
    outputs: [
      {
        internalType: "contract PhotochromicRegistrar",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "yrs",
        type: "uint256",
      },
    ],
    name: "renew",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "resolver",
    outputs: [
      {
        internalType: "contract PhotochromicResolver",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newGracePeriod",
        type: "uint256",
      },
    ],
    name: "setGracePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newPricePerYear",
        type: "uint256",
      },
    ],
    name: "setPricePerYear",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint128",
            name: "price",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "info",
            type: "uint128",
          },
        ],
        internalType: "struct PhotochromicCore.Profile[]",
        name: "newProfiles",
        type: "tuple[]",
      },
    ],
    name: "setProfiles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "setResolverOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newTicketValidity",
        type: "uint256",
      },
    ],
    name: "setTicketValidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ticketValidity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "livenessTime",
        type: "uint32",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
        ],
        internalType: "struct EcdsaSig",
        name: "sig",
        type: "tuple",
      },
    ],
    name: "updateLiveness",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newPhotochromicSignerAddress",
        type: "address",
      },
    ],
    name: "updateSignerAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newResolver",
        type: "address",
      },
    ],
    name: "upgradeResolver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class PhotochromicCore__factory {
  static readonly abi = _abi;
  static createInterface(): PhotochromicCoreInterface {
    return new utils.Interface(_abi) as PhotochromicCoreInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PhotochromicCore {
    return new Contract(address, _abi, signerOrProvider) as PhotochromicCore;
  }
}
