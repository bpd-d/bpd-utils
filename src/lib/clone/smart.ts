import { isPlainObject } from "../../objects/utils";
import { isArray, isNil } from "../utils";

export type CloneHandler<T> = {
  is: (input: T) => boolean;
  clone: (input: T) => T;
};

function deepCloneArray<T>(input: T[]): T[] {
  return input.map((item) => deepCloneSmart(item));
}

function deepCloneObject<T extends object>(input: T): T {
  return Object.entries(input).reduce((acc, [key, value]) => {
    acc[key as keyof T] = deepCloneSmart(value);
    return acc;
  }, {} as T);
}

const arrayCloneHandler: CloneHandler<any[]> = {
  is: isArray,
  clone: deepCloneArray,
};

const objectCloneHandler: CloneHandler<object> = {
  is: isPlainObject,
  clone: deepCloneObject,
};

const nilHandler: CloneHandler<any> = {
  is: isNil,
  clone: (input) => input,
};

const cloneHandlers: CloneHandler<any>[] = [
  nilHandler,
  arrayCloneHandler,
  objectCloneHandler,
];

export function deepCloneSmart<T>(input: T): T {
  for (const handler of cloneHandlers) {
    if (handler.is(input)) {
      return handler.clone(input);
    }
  }

  return input;
}
