import type { Nil, Then } from "../lib/utils";

export type PlainObject = Record<string, any>;
export type Values<T extends PlainObject> = T[keyof T];

export type ObjectEnumerate<T, V> = (
  key: keyof T,
  value: T[keyof T],
  obj: T,
  index: number
) => V;

export type TObjects<T extends PlainObject> = {
  orElse(value: T): T;
  then<V extends PlainObject>(thenable: Then<T, V>): TObjects<V>;
  forEach(callback: ObjectEnumerate<T, void>): TObjects<T>;
  copy(): TObjects<T>;
  clone(deepClone?: boolean): TObjects<T>;
  toMap(): Map<string, any>;
  length: number;
  isNil: boolean;
  isEmpty: boolean;
  value: T | Nil;
  keys: string[];
  values: any[];
};
