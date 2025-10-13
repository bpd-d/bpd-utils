import type { DeepCloneStrategy } from "../lib/clone";
import type { Nil, Then } from "../lib/utils";

export type PlainObject = Record<string, any>;
export type Values<T extends PlainObject> = T[keyof T];

export type ObjectEnumerate<T, V> = (
  key: keyof T,
  value: T[keyof T],
  obj: T,
  index: number
) => V;

export type Objects<T extends PlainObject> = {
  orElse(value: T): T;
  then<V extends PlainObject>(thenable: Then<T, V>): Objects<V>;
  forEach(callback: ObjectEnumerate<T, void>): Objects<T>;
  filter<V extends PlainObject>(
    callback: ObjectEnumerate<T, boolean>
  ): Objects<V>;
  copy(): Objects<T>;
  clone(strategy?: DeepCloneStrategy): Objects<T>;
  toMap(): Map<string, any>;
  length: number;
  isNil: boolean;
  isEmpty: boolean;
  value: T | Nil;
  keys: string[];
  values: Values<T>[];
};
