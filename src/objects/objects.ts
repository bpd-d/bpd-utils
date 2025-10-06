import { isNil, type Nil, type Then } from "../util/utils";
import type { PlainObject, TObjects } from "./types";

export default function Objects<T extends PlainObject>(
  input: Nil | T
): TObjects<T> {
  return {
    then<V extends PlainObject>(thenCallback: Then<T, V>): TObjects<T | V> {
      if (isNil(input)) {
        // To review
        return Objects(input) as TObjects<T | V>;
      }

      return Objects(thenCallback(input));
    },
    copy(): TObjects<T> {
      return this.then((obj) => ({ ...obj }));
    },
    clone(): TObjects<T> {
      return this.then((obj) => JSON.parse(JSON.stringify(obj)) as T);
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
  };
}
