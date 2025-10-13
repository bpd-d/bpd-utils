export type Nil = null | undefined;
export type OrNil<T> = T | Nil;
export type Then<T, V> = (input: T) => V | Nil;

export function isNil(value: any): value is Nil {
  return value === null || value === undefined;
}

export function notNil<T>(value: T): value is Exclude<T, Nil> {
  return !isNil(value);
}

export function notUndefined<T>(value: T): value is Exclude<T, undefined> {
  return value !== undefined;
}

export function isString(value: any): value is string {
  return typeof value === "string" || value instanceof String;
}

export function shallowArrayCopy<T>(array: T[]): T[] {
  if (isNil(array)) {
    return array;
  }
  return [...array];
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value);
}

export function isArray2<T>(value: any): value is T[] {
  return Array.isArray(value);
}
