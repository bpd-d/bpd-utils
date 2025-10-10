import { deepClone, DeepCloneStrategy } from "../lib/clone";
import { isNil, type Nil, type Then } from "../lib/utils";
import type { ObjectEnumerate, PlainObject, TObjects } from "./types";
import { enumerateObject } from "./utils";

export default function Objects<T extends PlainObject>(
  input: Nil | T
): TObjects<T> {
  return {
    then<V extends PlainObject>(thenCallback: Then<T, V>): TObjects<V> {
      if (isNil(input)) {
        // To review
        return Objects(input) as TObjects<V>;
      }

      return Objects(thenCallback(input));
    },
    forEach(callback: ObjectEnumerate<T, void>): TObjects<T> {
      return this.then((obj) => {
        enumerateObject(obj, callback);
        return obj;
      });
    },
    copy(): TObjects<T> {
      return this.then((obj) => ({ ...obj }));
    },
    clone(deep?: boolean, deepCloneStrategy?: DeepCloneStrategy): TObjects<T> {
      return this.then((obj) => {
        if (deep === true) {
          return deepClone(obj, { strategy: deepCloneStrategy }) as T;
        }

        return { ...obj } as T;
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
    get values(): any[] {
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
