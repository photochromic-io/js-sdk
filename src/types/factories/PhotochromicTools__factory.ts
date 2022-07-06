/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  PhotochromicTools,
  PhotochromicToolsInterface,
} from "../PhotochromicTools";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "ensName",
        type: "string",
      },
    ],
    name: "decomposeEns",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ipfs",
        type: "bytes32",
      },
    ],
    name: "ipfsToString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "baseNodeHash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
    ],
    name: "namehash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

export class PhotochromicTools__factory {
  static readonly abi = _abi;
  static createInterface(): PhotochromicToolsInterface {
    return new utils.Interface(_abi) as PhotochromicToolsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PhotochromicTools {
    return new Contract(address, _abi, signerOrProvider) as PhotochromicTools;
  }
}
