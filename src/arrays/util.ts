import { isNil, type OrNil } from "../lib/utils";
import Arrays from "./arrays";
import type {
  ArraysType,
  ArrayThen,
  Function,
  KeyCallbackType,
  Predicate,
} from "./types";

export function thenCallback<T, V>(
  input: OrNil<T[]>,
  callback: ArrayThen<T, V>
): ArraysType<T | V> {
  if (isNil(input)) {
    return Arrays(input);
  }

  const result = callback(input);

  return Arrays(result);
}

export function filterArray<T>(array: T[], predicate: Predicate<T>): T[] {
  return array.filter(predicate);
}

export function deleteFromArray<T>(array: T[], predicate: Predicate<T>): T[] {
  return array.filter((item) => !predicate(item));
}

export function mapArray<T, V>(array: T[], callback: (item: T) => V): V[] {
  return array.map(callback);
}

export function mapIfMatch<T, V>(
  item: T,
  predicate: Predicate<T>,
  mapper: Function<T, V>
): T | V {
  if (predicate(item)) {
    const mapped = mapper(item);
    return mapped;
  }

  return item;
}

export function keyExtractorStrategy<T, V>(
  value: KeyCallbackType<T, V>
): Function<T, V> {
  if (isNil(value)) {
    return (v: T) => v as any as V;
  }

  if (typeof value === "function") {
    return value as Function<T, V>;
  }

  if (typeof value === "string") {
    return (v: T) => (v as any)[value] as V;
  }

  throw new Error("Invalid key extractor");
}

export function distinctBy<T, V>(
  array: T[],
  extractor: KeyCallbackType<T, V>
): T[] {
  const keySet = new Set<V>();
  const keyExtractor = keyExtractorStrategy<T, V>(extractor);
  return array.reduce((acc: T[], item: T) => {
    const key = keyExtractor(item);
    if (!keySet.has(key)) {
      keySet.add(key);
      acc.push(item);
    }
    return acc;
  }, []);
}

export function resizeTo<T>(
  array: OrNil<T[]>,
  size: number,
  defaultValue: T
): T[] {
  if (size <= 0) {
    return [];
  }
  const newArray = isNil(array) ? [] : [...array];
  const length = newArray.length;

  if (length === size) {
    return newArray;
  }

  if (length > size) {
    newArray.splice(size, length - size);
    return newArray;
  }

  while (newArray.length < size) {
    newArray.push(defaultValue);
  }

  return newArray;
}
