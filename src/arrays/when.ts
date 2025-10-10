import { isNil, type OrNil } from "../lib/utils";
import Arrays from "./arrays";
import type { ArraysWhenType, Function, Predicate } from "./types";
import {
  deleteFromArray,
  filterArray,
  mapArray,
  mapIfMatch,
  thenCallback,
} from "./util";

export function ArraysWhen<T>(
  input: OrNil<T[]>,
  whenCallback: Predicate<T>
): ArraysWhenType<T> {
  return {
    filter() {
      return thenCallback(input, (array) => filterArray(array, whenCallback));
    },
    delete() {
      return thenCallback(input, (array) =>
        deleteFromArray(array, whenCallback)
      );
    },
    then(mapper: Function<T, T>) {
      if (isNil(input)) {
        return ArraysWhen(input, whenCallback);
      }

      const newArray = mapArray(input, (item) =>
        mapIfMatch(item, whenCallback, mapper)
      );

      return ArraysWhen(newArray, whenCallback);
    },
    orAdd(newValue: T) {
      const array = isNil(input) ? [] : input;
      if (array.findIndex(whenCallback) === -1) {
        array.push(newValue);
      }
      return ArraysWhen(array, whenCallback);
    },
    firstOrDefault(defaultValue: T): T {
      const values = this.values;
      if (isNil(values) || values.length === 0) {
        return defaultValue;
      }
      return values[0];
    },
    toArrays() {
      return Arrays(input);
    },
    get length(): number {
      const values = this.values;
      return isNil(values) ? -1 : values.length;
    },
    get isEmpty(): boolean {
      return this.length <= 0;
    },
    get first(): T | undefined {
      const values = this.values;
      if (isNil(values) || values.length === 0) {
        return undefined;
      }
      return values[0];
    },
    get values(): T[] | undefined {
      if (isNil(input)) {
        return undefined;
      }
      return input.filter(whenCallback);
    },
  };
}
