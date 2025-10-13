import { deepClone, DeepCloneStrategy } from "../lib/clone";
import { isNil, type Nil, type Then } from "../lib/utils";
import type { ObjectEnumerate, PlainObject, Objects } from "./types";
import { enumerateObject, isPlainObject, thenObject } from "./utils";

export default function Objects<T extends PlainObject>(
  input: Nil | T
): Objects<T> {
  if (!isNil(input) && !isPlainObject(input)) {
    throw new TypeError("Input must be a plain object");
  }

  return {
    then<V extends PlainObject>(thenCallback: Then<T, V>): Objects<V> {
      return Objects(thenObject(input, thenCallback));
    },
    forEach(callback: ObjectEnumerate<T, void>): Objects<T> {
      return this.then((obj) => {
        enumerateObject(obj, callback);
        return obj;
      });
    },
    filter<V extends PlainObject>(
      callback: ObjectEnumerate<T, boolean>
    ): Objects<V> {
      return this.then((obj) => {
        return Object.entries(obj).reduce((acc, [key, value], index) => {
          if (callback(key as keyof T, value as T[keyof T], obj, index)) {
            acc[key as keyof V] = value as unknown as V[keyof V];
          }
          return acc;
        }, {} as V);
      });
    },
    copy(): Objects<T> {
      return this.then((obj) => ({ ...obj }));
    },
    clone(strategy?: DeepCloneStrategy): Objects<T> {
      return this.then((obj) => {
        return deepClone(obj, { strategy }) as T;
      });
    },
    toMap(): Map<string, any> {
      if (isNil(input)) {
        return new Map();
      }
      return new Map(Object.entries(input));
    },
    orElse(value: T): T {
      return !isNil(input) ? input : value;
    },
    get isNil(): boolean {
      return isNil(input);
    },
    get isEmpty(): boolean {
      return isNil(input) || Object.keys(input).length === 0;
    },
    get keys(): string[] {
      return isNil(input) ? [] : Object.keys(input);
    },
    get values() {
      return isNil(input) ? [] : Object.values(input);
    },
    get value() {
      return input;
    },
    get length(): number {
      return this.keys.length;
    },
  };
}
