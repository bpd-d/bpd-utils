import type { Nil, Then } from "../util/utils";

export type PlainObject = { [x: string]: any };

export type TObjects<T extends PlainObject> = {
  orElse(value: T): T;
  then<V extends PlainObject>(thenable: Then<T, V>): TObjects<T | V>;
  copy(): TObjects<T>;
  clone(): TObjects<T>;
  toMap(): Map<string, any>;
  isNil: boolean;
  isEmpty: boolean;
  value: T | Nil;
  keys: string[];
  values: any[];
};
