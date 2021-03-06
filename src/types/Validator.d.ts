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

interface ValidatorInterface extends ethers.utils.Interface {
  functions: {
    "concatTimestamp(bytes,uint32)": FunctionFragment;
    "extractTimestamp(bytes)": FunctionFragment;
    "getPhotochromicRecord(string,bytes)": FunctionFragment;
    "getValidityInfo(bytes)": FunctionFragment;
    "isIORecord(string)": FunctionFragment;
    "isPhotochromicRecord(string)": FunctionFragment;
    "packKYCData(string[5])": FunctionFragment;
    "packPhotochromicRecord(string,string,string,uint32)": FunctionFragment;
    "packValidityInfo(uint32,uint32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "concatTimestamp",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "extractTimestamp",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getPhotochromicRecord",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getValidityInfo",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "isIORecord", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isPhotochromicRecord",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "packKYCData",
    values: [[string, string, string, string, string]]
  ): string;
  encodeFunctionData(
    functionFragment: "packPhotochromicRecord",
    values: [string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "packValidityInfo",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "concatTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "extractTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPhotochromicRecord",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getValidityInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isIORecord", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isPhotochromicRecord",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "packKYCData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "packPhotochromicRecord",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "packValidityInfo",
    data: BytesLike
  ): Result;

  events: {};
}

export class Validator extends BaseContract {
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

  interface: ValidatorInterface;

  functions: {
    concatTimestamp(
      value: BytesLike,
      ts: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    extractTimestamp(
      value: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, number]>;

    getPhotochromicRecord(
      key: string,
      record: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getValidityInfo(
      record: BytesLike,
      overrides?: CallOverrides
    ): Promise<[number, number]>;

    isIORecord(key: string, overrides?: CallOverrides): Promise<[boolean]>;

    isPhotochromicRecord(
      key: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    packKYCData(
      contents: [string, string, string, string, string],
      overrides?: CallOverrides
    ): Promise<[string]>;

    packPhotochromicRecord(
      userId: string,
      profile: string,
      contents: string,
      t: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    packValidityInfo(
      livenessTime: BigNumberish,
      expiryTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  concatTimestamp(
    value: BytesLike,
    ts: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  extractTimestamp(
    value: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string, number]>;

  getPhotochromicRecord(
    key: string,
    record: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  getValidityInfo(
    record: BytesLike,
    overrides?: CallOverrides
  ): Promise<[number, number]>;

  isIORecord(key: string, overrides?: CallOverrides): Promise<boolean>;

  isPhotochromicRecord(
    key: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  packKYCData(
    contents: [string, string, string, string, string],
    overrides?: CallOverrides
  ): Promise<string>;

  packPhotochromicRecord(
    userId: string,
    profile: string,
    contents: string,
    t: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  packValidityInfo(
    livenessTime: BigNumberish,
    expiryTime: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    concatTimestamp(
      value: BytesLike,
      ts: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    extractTimestamp(
      value: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, number]>;

    getPhotochromicRecord(
      key: string,
      record: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    getValidityInfo(
      record: BytesLike,
      overrides?: CallOverrides
    ): Promise<[number, number]>;

    isIORecord(key: string, overrides?: CallOverrides): Promise<boolean>;

    isPhotochromicRecord(
      key: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    packKYCData(
      contents: [string, string, string, string, string],
      overrides?: CallOverrides
    ): Promise<string>;

    packPhotochromicRecord(
      userId: string,
      profile: string,
      contents: string,
      t: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    packValidityInfo(
      livenessTime: BigNumberish,
      expiryTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    concatTimestamp(
      value: BytesLike,
      ts: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    extractTimestamp(
      value: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPhotochromicRecord(
      key: string,
      record: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getValidityInfo(
      record: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isIORecord(key: string, overrides?: CallOverrides): Promise<BigNumber>;

    isPhotochromicRecord(
      key: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    packKYCData(
      contents: [string, string, string, string, string],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    packPhotochromicRecord(
      userId: string,
      profile: string,
      contents: string,
      t: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    packValidityInfo(
      livenessTime: BigNumberish,
      expiryTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    concatTimestamp(
      value: BytesLike,
      ts: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    extractTimestamp(
      value: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPhotochromicRecord(
      key: string,
      record: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getValidityInfo(
      record: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isIORecord(
      key: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPhotochromicRecord(
      key: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    packKYCData(
      contents: [string, string, string, string, string],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    packPhotochromicRecord(
      userId: string,
      profile: string,
      contents: string,
      t: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    packValidityInfo(
      livenessTime: BigNumberish,
      expiryTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
