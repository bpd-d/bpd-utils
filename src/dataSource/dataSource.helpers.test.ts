import { describe, expect, it } from "vitest";
import {
  createDataSourceEntry,
  isCacheEntryValid,
  defaultKeyGetter,
} from "./dataSource.helpers";

describe("dataSource - helpers", () => {
  it("createDataSourceEntry", () => {
    const entry = createDataSourceEntry("test");

    expect(entry.data).toBe("test");
    expect(typeof entry.timestamp).toBe("number");
  });
  it("isCacheEntryValid", () => {
    const now = Date.now();
    const validEntry = { data: "valid", timestamp: now - 1000 };
    const expiredEntry = { data: "expired", timestamp: now - 5000 };
    const timeToLive = 3000;

    expect(isCacheEntryValid(validEntry, timeToLive)).toBe(true);
    expect(isCacheEntryValid(expiredEntry, timeToLive)).toBe(false);
  });

  it("defaultKeyGetter", () => {
    expect(defaultKeyGetter()).toBe("$default");
    expect(defaultKeyGetter("arg1")).toBe(JSON.stringify(["arg1"]));
    expect(defaultKeyGetter("arg1", "arg2")).toBe(
      JSON.stringify(["arg1", "arg2"]),
    );
  });
});
