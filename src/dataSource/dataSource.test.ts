import { describe, expect, it } from "vitest";
import { createDataSource } from "./dataSource";

const TestApi = (arg: string, timeout: number = 0) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(arg);
    }, timeout);
  });
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("dataSource", () => {
  it("creates a data source and retrieves data", async () => {
    const dataSource = createDataSource({
      getData: TestApi,
      timeToLive: 1000,
    });

    const result1 = await dataSource.getData("test", 100);
    expect(result1).toBe("test");

    const result2 = await dataSource.getData("test2", 100);
    expect(result2).toBe("test");

    await sleep(1100); // Wait for cache to expire

    const result3 = await dataSource.getData("test3", 100);
    expect(result3).toBe("test3");
  });

  it("invalidates cache correctly", async () => {
    const dataSource = createDataSource({
      getData: TestApi,
      timeToLive: 1000,
    });

    const result1 = await dataSource.getData("test", 100);
    expect(result1).toBe("test");

    dataSource.invalidate();

    const result2 = await dataSource.getData("test2", 100);
    expect(result2).toBe("test2");
  });

  it("handles custom key getters", async () => {
    const dataSource = createDataSource({
      getData: TestApi,
      timeToLive: 1000,
      getKey: (arg, _arg1: number) => `key-${arg}`,
    });

    const result1 = await dataSource.getData("test", 100);
    expect(result1).toBe("test");
  });
});
