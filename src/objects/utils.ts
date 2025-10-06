import { isNil } from "../util/utils";
import type { PlainObject } from "./types";

const PLAIN_PROTOTYPES = [undefined, Object];

export const isPlainObject = (value: any): value is PlainObject =>
  !isNil(value) && PLAIN_PROTOTYPES.includes(value.constructor);
