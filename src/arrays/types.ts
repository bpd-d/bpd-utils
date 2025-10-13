import type { Nil } from "../lib/utils";

export type Predicate<T> = (value: T) => boolean;
export type Function<T, V> = (value: T) => V;
export type FunctionIdentity<T> = (value: T) => T;
export type FunctionVoid<T, V> = (value: T) => V | undefined;
export type Consumer<T> = (value: T) => void;

export type IndexType = number | "first" | "last";
export type KeyCallbackType<T, V> = keyof T | Nil | Function<T, V>;

export type ArrayThen<T, V> = (array: T[]) => V[] | Nil;
export type ArrayMap<T, V> = (item: T, index: number, array: T[]) => V;
export type ArrayForEach<T> = (item: T, index: number, array: T[]) => void;
export type ArraySort<T> = (item1: T, item2: T) => number;
export type ArrayReduce<T, V> = (
  accumulator: V,
  item: T,
  index: number,
  array: T[]
) => V | undefined;

export type Arrays<T> = {
  values: T[] | Nil;
  length: number;
  isEmpty: boolean;
  then<V>(callback: ArrayThen<T, V>): Arrays<T | V>;
  map<V>(callback: ArrayMap<T, V>): Arrays<T | V>;
  when(predicate: Predicate<T>): ArraysWhenType<T>;
  at(index: IndexType): ArraysAtType<T>;
  distinct<V>(extractor?: KeyCallbackType<T, V>): Arrays<T>;
  copy(): Arrays<T | Nil>;
  resize(size: number, defaultValue?: T): Arrays<T | undefined>;
  forEach(callback: ArrayForEach<T>): Arrays<T>;
  sort(callback?: ArraySort<T>): Arrays<T>;
  push(item: T): Arrays<T>;
  pop(consumer?: Consumer<T | undefined>): Arrays<T>;
  reduce<V>(callback: ArrayReduce<T, V>, initialValue: V): Arrays<V> | V;
  some(predicate: Predicate<T>): boolean;
  find(predicate: Predicate<T>): T | undefined;
  orElse(defaultValue: T[]): T[];
  orEmpty(): T[];
};

export type ArraysWhenType<T> = {
  filter: () => Arrays<T>;
  delete: () => Arrays<T>;
  then(callback: Function<T, T>): ArraysWhenType<T>;
  orAdd(newValue: T): ArraysWhenType<T>;
  toArrays: () => Arrays<T | Nil>;
  firstOrDefault(defaultValue: T): T;
  isEmpty: boolean;
  length: number;
  values: T[] | undefined;
  first: T | undefined;
};

export type ArraysAtType<T> = {
  then(callback: Function<T, T>): ArraysAtType<T>;
  delete(): Arrays<T>;
  set(value: T): ArraysAtType<T>;
  orAdd(value: T): ArraysAtType<T>;
  toArrays(): Arrays<T>;
  orElse(defaultValue: T): T;
  value: T | undefined;
};
