import { isNil, shallowArrayCopy, type Nil } from "../util/utils";
import ArraysAt from "./at";
import type {
  ArrayForEach,
  ArrayMap,
  ArraysAtType,
  ArraySort,
  ArraysType,
  ArraysWhenType,
  ArrayThen,
  IndexType,
  KeyCallbackType,
  Predicate,
} from "./types";
import { distinctBy, resizeTo, thenCallback } from "./util";
import { ArraysWhen } from "./when";

export default function Arrays<T>(input: T[] | Nil): ArraysType<T> {
  const length = isNil(input) ? -1 : input.length;

  return {
    then<V>(callback: ArrayThen<T, V>): ArraysType<T | V> {
      return thenCallback(input, callback);
    },
    map<V>(callback: ArrayMap<T, V>): ArraysType<T | V> {
      return this.then((array) => array.map(callback));
    },
    copy(): ArraysType<T | Nil> {
      return this.then(shallowArrayCopy);
    },
    when: (predicate: Predicate<T>): ArraysWhenType<T> => {
      return ArraysWhen(input, predicate);
    },
    at(index: IndexType): ArraysAtType<T> {
      return ArraysAt(input, index);
    },
    distinct<V>(extractor?: KeyCallbackType<T, V> | undefined): ArraysType<T> {
      return this.then((array) => distinctBy<T, V>(array, extractor));
    },
    resize(size: number, defaultValue?: T): ArraysType<T | undefined> {
      return Arrays(resizeTo(input, size, defaultValue));
    },
    sort(callback?: ArraySort<T>): ArraysType<T> {
      return this.then((array) => array.sort(callback));
    },
    forEach(callback: ArrayForEach<T>): ArraysType<T> {
      return this.then((array) => {
        array.forEach(callback);
        return array;
      });
    },
    push(item: T): ArraysType<T> {
      const array = !isNil(input) ? input : [];
      array.push(item);
      return Arrays(array);
    },
    some(predicate: Predicate<T>): boolean {
      return !isNil(input) && input.some(predicate);
    },
    find(predicate: Predicate<T>): T | undefined {
      return isNil(input) ? undefined : input.find(predicate);
    },
    orElse(defaultValue: T[]): T[] {
      return isNil(input) ? defaultValue : input;
    },
    orEmpty(): T[] {
      return isNil(input) ? [] : input;
    },
    get isEmpty(): boolean {
      return length <= 0;
    },
    get length(): number {
      return length;
    },
    get values(): T[] | Nil {
      return input;
    },
  };
}
