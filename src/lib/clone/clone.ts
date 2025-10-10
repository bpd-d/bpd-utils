import type { Values } from "../../objects/types";
import { isNil } from "../utils";
import { deepCloneSmart } from "./smart";

export const DeepCloneStrategy = {
  JSON: "json",
  SMART: "smart",
} as const;

export type DeepCloneStrategy = Values<typeof DeepCloneStrategy>;

function deepCloneJson<T>(input: T): T {
  return JSON.parse(JSON.stringify(input));
}

export type DeepCloneOptions = {
  strategy?: Values<typeof DeepCloneStrategy>;
};

export function deepClone<T>(input: T, options?: DeepCloneOptions): T {
  if (isNil(input)) {
    return input;
  }

  switch (options?.strategy) {
    case DeepCloneStrategy.JSON:
      return deepCloneJson(input);
    default:
      return deepCloneSmart(input);
  }
}
