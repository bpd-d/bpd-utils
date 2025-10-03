import { expect, test } from "vitest";
import Arrays from "./arrays";

test("value", () => {
  const array = [1, 2, 3];

  const result = Arrays(array).values;
  expect(array).toBe(result);
});

test("length", () => {
  const array = [1, 2, 3];

  const result = Arrays(array).length;
  expect(result).toBe(3);
});

test("length with null", () => {
  const result = Arrays(null).length;
  expect(result).toBe(-1);
});

test("isEmpty - empty", () => {
  const result = Arrays(null).isEmpty;
  expect(result).toBe(true);
});

test("isEmpty - non empty", () => {
  const result = Arrays([1, 2]).isEmpty;
  expect(result).toBe(false);
});

test("orElse with null", () => {
  const defaultValue = [4, 5, 6];
  const result = Arrays(null).orElse(defaultValue);
  expect(result).toBe(defaultValue);
});

test("orElse with non-null", () => {
  const array = [1, 2, 3];
  const defaultValue = [4, 5, 6];
  const result = Arrays(array).orElse(defaultValue);
  expect(result).toBe(array);
});

test("copy", () => {
  const array = [1, 2, 3];
  const result = Arrays(array).copy();
  expect(result.values).toEqual(array);
  expect(result.values).not.toBe(array); // Ensure it's a different reference
});

test("map", () => {
  const array = [1, 2, 3];
  const result = Arrays(array).map((v) => v * 2);
  expect(result.values).toEqual([2, 4, 6]);
});

test("then", () => {
  const array = [1, 2, 3];
  const result = Arrays(array).then((arr) => arr.map((v) => v * 3));
  expect(result.values).toEqual([3, 6, 9]);
});

test("distinct - no arg", () => {
  const array = [1, 2, 2, 3, 3, 3];

  const result = Arrays(array).distinct(null);

  expect(result.values).toEqual([1, 2, 3]);
});

test("distinct - callback extractor", () => {
  const array = [
    { id: 1 },
    { id: 2 },
    { id: 2 },
    { id: 3 },
    { id: 3 },
    { id: 3 },
  ];

  const extractor = (item: { id: number }) => item.id;

  const result = Arrays(array).distinct(extractor);

  expect(result.values).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
});

test("distinct - key extractor", () => {
  const array = [
    { id: 1 },
    { id: 2 },
    { id: 2 },
    { id: 3 },
    { id: 3 },
    { id: 3 },
  ];

  const result = Arrays(array).distinct("id");

  expect(result.values).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
});

test("orEmpty with null", () => {
  const result = Arrays(null).orEmpty();
  expect(result).toEqual([]);
});

test("orEmpty with non-null", () => {
  const array = [1, 2, 3];
  const result = Arrays(array).orEmpty();
  expect(result).toBe(array);
});

test("resize - larger size than array", () => {
  const array = [1, 2, 3];
  const result = Arrays(array).resize(5, 0);
  expect(result.values).toEqual([1, 2, 3, 0, 0]);
});

test("resize - smaller size than array", () => {
  const array = [1, 2, 3, 4, 5];
  const result = Arrays(array).resize(3);
  expect(result.values).toEqual([1, 2, 3]);
});

test("resize - size zero", () => {
  const array = [1, 2, 3];
  const result = Arrays(array).resize(0);
  expect(result.values).toEqual([]);
});
