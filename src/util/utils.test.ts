import { test, expect } from "vitest";
import { isNil, shallowArrayCopy } from "./utils";

test("isNil should return true for null or undefined", () => {
  expect(isNil(null)).toBe(true);
  expect(isNil(undefined)).toBe(true);
});

test("isNil should return false for non-null/undefined values", () => {
  expect(isNil(0)).toBe(false);
  expect(isNil("")).toBe(false);
  expect(isNil([])).toBe(false);
  expect(isNil({})).toBe(false);
});

test("shallowArrayCopy should create a shallow copy of the array", () => {
  const original = [1, 2, 3];
  const copy = shallowArrayCopy(original);

  expect(copy).toEqual(original);
  expect(copy).not.toBe(original); // Ensure it's a different reference
});

test("shallowArrayCopy should return null when input is null", () => {
  expect(shallowArrayCopy(null as unknown as any[])).toBe(null);
});

test("shallowArrayCopy should return undefined when input is undefined", () => {
  expect(shallowArrayCopy(undefined as unknown as any[])).toBe(undefined);
});
