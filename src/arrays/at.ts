import { isArray, type OrNil } from "../lib/utils";
import Arrays from "./arrays";
import type { ArraysAtType, Function, IndexType } from "./types";

function resolveIndex(index: IndexType, length: number): number {
  if (length < 0) {
    return length;
  }

  switch (index) {
    case "first":
      return 0;
    case "last":
      return length - 1;
    default:
      if (index < 0) {
        const resolved = length + index;
        return resolved < 0 ? -1 : resolved;
      }
      return index >= length ? -1 : index;
  }
}

export default function ArraysAt<T>(
  array: OrNil<T[]>,
  index: IndexType
): ArraysAtType<T> {
  const length = array?.length ?? -1;
  const resolvedIndex = resolveIndex(index, length);
  const isArrayInput = isArray(array);
  const isValidIndex = resolvedIndex >= 0 && isArrayInput;

  return {
    then(callback: Function<T, T>) {
      if (!isValidIndex) {
        return Arrays(array);
      }

      array[resolvedIndex] = callback(array[resolvedIndex]);
      return Arrays(array);
    },
    delete() {
      if (!isValidIndex) {
        return Arrays(array);
      }

      array.splice(resolvedIndex, 1);
      return Arrays(array);
    },
    orElse(defaultValue: T): T {
      const value = this.value;
      return value === undefined ? defaultValue : value;
    },
    get value(): T | undefined {
      if (!isValidIndex) {
        return undefined;
      }
      return array[resolvedIndex];
    },
  };
}
