import { expect, test } from "vitest";
import Objects from "./objects";

test("Objects - forEach", () => {
  const input = { a: 1, b: 2, c: 3 };
  const keys: string[] = [];
  const values: number[] = [];

  const result = Objects(input).forEach((key, value) => {
    keys.push(key as string);
    values.push(value as number);
  });

  expect(keys).toEqual(["a", "b", "c"]);
  expect(values).toEqual([1, 2, 3]);
  expect(result.value).toEqual(input);
});

test("Objects - forEach - null object", () => {
  const keys: string[] = [];
  const values: number[] = [];

  const result = Objects(null).forEach((key, value) => {
    keys.push(key as string);
    values.push(value as number);
  });

  expect(keys).toEqual([]);
  expect(values).toEqual([]);
  expect(result.value).toEqual(null);
});
