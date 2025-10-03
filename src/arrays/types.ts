import type { Nil } from "../util/utils";

export type Predicate<T> = (value: T) => boolean;
export type Function<T, V> = (value: T) => V;
export type FunctionIdentity<T> = (value: T) => T;
export type FunctionVoid<T, V> = (value: T) => V | undefined;

export type IndexType = number | "first" | "last";
export type KeyCallbackType<T, V> = keyof T | Nil | Function<T, V>;

export type ArrayThen<T, V> = (array: T[]) => V[] | Nil;
export type ArrayMap<T, V> = (item: T, index: number, array: T[]) => V;
export type ArrayForEach<T> = (item: T, index: number, array: T[]) => void;
export type ArraySort<T> = (item1: T, item2: T) => number;

export type ArraysType<T> = {
  values: T[] | Nil;
  length: number;
  isEmpty: boolean;
  then<V>(callback: ArrayThen<T, V>): ArraysType<T | V>;
  map<V>(callback: ArrayMap<T, V>): ArraysType<T | V>;
  when(predicate: Predicate<T>): ArraysWhenType<T>;
  at(index: IndexType): ArraysAtType<T>;
  distinct<V>(extractor?: KeyCallbackType<T, V>): ArraysType<T>;
  copy(): ArraysType<T | Nil>;
  resize(size: number, defaultValue?: T): ArraysType<T | undefined>;
  forEach(callback: ArrayForEach<T>): ArraysType<T>;
  sort(callback?: ArraySort<T>): ArraysType<T>;
  push(item: T): ArraysType<T>;
  some(predicate: Predicate<T>): boolean;
  find(predicate: Predicate<T>): T | undefined;
  orElse(defaultValue: T[]): T[];
  orEmpty(): T[];
};

export type ArraysWhenType<T> = {
  filter: () => ArraysType<T>;
  delete: () => ArraysType<T>;
  then(callback: Function<T, T>): ArraysWhenType<T>;
  orAdd(newValue: T): ArraysWhenType<T>;
  toArrays: () => ArraysType<T | Nil>;
  firstOrDefault(defaultValue: T): T;
  isEmpty: boolean;
  length: number;
  values: T[] | undefined;
  first: T | undefined;
};

export type ArraysAtType<T> = {
  then(callback: Function<T, T>): ArraysAtType<T>;
  delete(): ArraysType<T>;
  set(value: T): ArraysAtType<T>;
  orAdd(value: T): ArraysAtType<T>;
  toArrays(): ArraysType<T>;
  orElse(defaultValue: T): T;
  value: T | undefined;
};
