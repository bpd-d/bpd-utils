import { isNil } from "../lib/utils";
import type { ObjectEnumerate, PlainObject } from "./types";

const PLAIN_PROTOTYPES = [undefined, Object];

export const isPlainObject = (value: any): value is PlainObject =>
  !isNil(value) && PLAIN_PROTOTYPES.includes(value.constructor);

export const enumerateObject = <T extends PlainObject, V>(
  object: T,
  callback: ObjectEnumerate<T, V>
) => {
  Object.entries(object).forEach(([key, value], index) => {
    callback(key as keyof T, value as T[keyof T], object, index);
  });
};
