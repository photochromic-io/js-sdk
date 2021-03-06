/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ResolverStubInterface extends ethers.utils.Interface {
  functions: {
    "ABI(bytes32,uint256)": FunctionFragment;
    "contenthash(bytes32)": FunctionFragment;
    "dnsRecord(bytes32,bytes32,uint16)": FunctionFragment;
    "interfaceImplementer(bytes32,bytes4)": FunctionFragment;
    "name(bytes32)": FunctionFragment;
    "pubkey(bytes32)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "zonehash(bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ABI",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "contenthash",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "dnsRecord",
    values: [BytesLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "interfaceImplementer",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "name", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "pubkey", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "zonehash", values: [BytesLike]): string;

  decodeFunctionResult(functionFragment: "ABI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "contenthash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dnsRecord", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "interfaceImplementer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pubkey", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "zonehash", data: BytesLike): Result;

  events: {
    "ABIChanged(bytes32,uint256)": EventFragment;
    "ContenthashChanged(bytes32,bytes)": EventFragment;
    "DNSRecordChanged(bytes32,bytes,uint16,bytes)": EventFragment;
    "DNSRecordDeleted(bytes32,bytes,uint16)": EventFragment;
    "DNSZoneCleared(bytes32)": EventFragment;
    "DNSZonehashChanged(bytes32,bytes,bytes)": EventFragment;
    "InterfaceChanged(bytes32,bytes4,address)": EventFragment;
    "NameChanged(bytes32,string)": EventFragment;
    "PubkeyChanged(bytes32,bytes32,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ABIChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContenthashChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DNSRecordChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DNSRecordDeleted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DNSZoneCleared"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DNSZonehashChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "InterfaceChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NameChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PubkeyChanged"): EventFragment;
}

export type ABIChangedEvent = TypedEvent<
  [string, BigNumber] & { node: string; contentType: BigNumber }
>;

export type ContenthashChangedEvent = TypedEvent<
  [string, string] & { node: string; hash: string }
>;

export type DNSRecordChangedEvent = TypedEvent<
  [string, string, number, string] & {
    node: string;
    name: string;
    resource: number;
    record: string;
  }
>;

export type DNSRecordDeletedEvent = TypedEvent<
  [string, string, number] & { node: string; name: string; resource: number }
>;

export type DNSZoneClearedEvent = TypedEvent<[string] & { node: string }>;

export type DNSZonehashChangedEvent = TypedEvent<
  [string, string, string] & {
    node: string;
    lastzonehash: string;
    zonehash: string;
  }
>;

export type InterfaceChangedEvent = TypedEvent<
  [string, string, string] & {
    node: string;
    interfaceID: string;
    implementer: string;
  }
>;

export type NameChangedEvent = TypedEvent<
  [string, string] & { node: string; name: string }
>;

export type PubkeyChangedEvent = TypedEvent<
  [string, string, string] & { node: string; x: string; y: string }
>;

export class ResolverStub extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ResolverStubInterface;

  functions: {
    ABI(
      node: BytesLike,
      contentTypes: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string]>;

    contenthash(node: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    dnsRecord(
      node: BytesLike,
      name: BytesLike,
      resource: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    interfaceImplementer(
      node: BytesLike,
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    name(node: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    pubkey(
      node: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, string] & { x: string; y: string }>;

    supportsInterface(
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    zonehash(node: BytesLike, overrides?: CallOverrides): Promise<[string]>;
  };

  ABI(
    node: BytesLike,
    contentTypes: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string]>;

  contenthash(node: BytesLike, overrides?: CallOverrides): Promise<string>;

  dnsRecord(
    node: BytesLike,
    name: BytesLike,
    resource: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  interfaceImplementer(
    node: BytesLike,
    interfaceID: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  name(node: BytesLike, overrides?: CallOverrides): Promise<string>;

  pubkey(
    node: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string, string] & { x: string; y: string }>;

  supportsInterface(
    interfaceID: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  zonehash(node: BytesLike, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    ABI(
      node: BytesLike,
      contentTypes: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string]>;

    contenthash(node: BytesLike, overrides?: CallOverrides): Promise<string>;

    dnsRecord(
      node: BytesLike,
      name: BytesLike,
      resource: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    interfaceImplementer(
      node: BytesLike,
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    name(node: BytesLike, overrides?: CallOverrides): Promise<string>;

    pubkey(
      node: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, string] & { x: string; y: string }>;

    supportsInterface(
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    zonehash(node: BytesLike, overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "ABIChanged(bytes32,uint256)"(
      node?: BytesLike | null,
      contentType?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber],
      { node: string; contentType: BigNumber }
    >;

    ABIChanged(
      node?: BytesLike | null,
      contentType?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber],
      { node: string; contentType: BigNumber }
    >;

    "ContenthashChanged(bytes32,bytes)"(
      node?: BytesLike | null,
      hash?: null
    ): TypedEventFilter<[string, string], { node: string; hash: string }>;

    ContenthashChanged(
      node?: BytesLike | null,
      hash?: null
    ): TypedEventFilter<[string, string], { node: string; hash: string }>;

    "DNSRecordChanged(bytes32,bytes,uint16,bytes)"(
      node?: BytesLike | null,
      name?: null,
      resource?: null,
      record?: null
    ): TypedEventFilter<
      [string, string, number, string],
      { node: string; name: string; resource: number; record: string }
    >;

    DNSRecordChanged(
      node?: BytesLike | null,
      name?: null,
      resource?: null,
      record?: null
    ): TypedEventFilter<
      [string, string, number, string],
      { node: string; name: string; resource: number; record: string }
    >;

    "DNSRecordDeleted(bytes32,bytes,uint16)"(
      node?: BytesLike | null,
      name?: null,
      resource?: null
    ): TypedEventFilter<
      [string, string, number],
      { node: string; name: string; resource: number }
    >;

    DNSRecordDeleted(
      node?: BytesLike | null,
      name?: null,
      resource?: null
    ): TypedEventFilter<
      [string, string, number],
      { node: string; name: string; resource: number }
    >;

    "DNSZoneCleared(bytes32)"(
      node?: BytesLike | null
    ): TypedEventFilter<[string], { node: string }>;

    DNSZoneCleared(
      node?: BytesLike | null
    ): TypedEventFilter<[string], { node: string }>;

    "DNSZonehashChanged(bytes32,bytes,bytes)"(
      node?: BytesLike | null,
      lastzonehash?: null,
      zonehash?: null
    ): TypedEventFilter<
      [string, string, string],
      { node: string; lastzonehash: string; zonehash: string }
    >;

    DNSZonehashChanged(
      node?: BytesLike | null,
      lastzonehash?: null,
      zonehash?: null
    ): TypedEventFilter<
      [string, string, string],
      { node: string; lastzonehash: string; zonehash: string }
    >;

    "InterfaceChanged(bytes32,bytes4,address)"(
      node?: BytesLike | null,
      interfaceID?: BytesLike | null,
      implementer?: null
    ): TypedEventFilter<
      [string, string, string],
      { node: string; interfaceID: string; implementer: string }
    >;

    InterfaceChanged(
      node?: BytesLike | null,
      interfaceID?: BytesLike | null,
      implementer?: null
    ): TypedEventFilter<
      [string, string, string],
      { node: string; interfaceID: string; implementer: string }
    >;

    "NameChanged(bytes32,string)"(
      node?: BytesLike | null,
      name?: null
    ): TypedEventFilter<[string, string], { node: string; name: string }>;

    NameChanged(
      node?: BytesLike | null,
      name?: null
    ): TypedEventFilter<[string, string], { node: string; name: string }>;

    "PubkeyChanged(bytes32,bytes32,bytes32)"(
      node?: BytesLike | null,
      x?: null,
      y?: null
    ): TypedEventFilter<
      [string, string, string],
      { node: string; x: string; y: string }
    >;

    PubkeyChanged(
      node?: BytesLike | null,
      x?: null,
      y?: null
    ): TypedEventFilter<
      [string, string, string],
      { node: string; x: string; y: string }
    >;
  };

  estimateGas: {
    ABI(
      node: BytesLike,
      contentTypes: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    contenthash(node: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    dnsRecord(
      node: BytesLike,
      name: BytesLike,
      resource: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    interfaceImplementer(
      node: BytesLike,
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(node: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    pubkey(node: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    zonehash(node: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ABI(
      node: BytesLike,
      contentTypes: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    contenthash(
      node: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    dnsRecord(
      node: BytesLike,
      name: BytesLike,
      resource: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    interfaceImplementer(
      node: BytesLike,
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(
      node: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pubkey(
      node: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceID: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    zonehash(
      node: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
