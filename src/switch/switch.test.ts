import { describe, expect, it } from "vitest";
import createSwitch from "./switch";
import {
  anyCondition,
  createCondition,
  eqCondition,
  noneCondition,
  notCondition,
} from "./switch.helpers";

describe("Tests for advanced Switch", () => {
  it("Supports equality check - not found", () => {
    const TestSwitch = createSwitch(eqCondition("test", "TEST"));

    expect(TestSwitch.one("X")).toBeUndefined();
  });

  it("Supports equality check - found", () => {
    const TestSwitch = createSwitch(eqCondition("test", "TEST"));

    expect(TestSwitch.one("test")).toEqual("TEST");
  });

  it("Supports negated equality check", () => {
    const TestSwitch = createSwitch(notCondition("test", "TEST"));

    expect(TestSwitch.one("test2")).toEqual("TEST");
  });

  it("Supports any from list check", () => {
    const TestSwitch = createSwitch(anyCondition(["test", "test2"], "TEST"));

    expect(TestSwitch.one("test2")).toEqual("TEST");
  });

  it("Supports none from list check", () => {
    const TestSwitch = createSwitch(noneCondition(["test", "test3"], "TEST"));

    expect(TestSwitch.one("test2")).toEqual("TEST");
  });

  it("Can create with eq condition", () => {
    const TestSwitch = createSwitch<string, string>().eq("test", "TEST");

    expect(TestSwitch.one("test")).toEqual("TEST");
  });

  it("Can create with eq condition", () => {
    const TestSwitch = createSwitch<string, string>().notEq("test2", "TEST");

    expect(TestSwitch.one("test")).toEqual("TEST");
  });

  it("Can create with not eq condition", () => {
    const TestSwitch = createSwitch<string, string>().notEq("test2", "TEST");

    expect(TestSwitch.one("test")).toEqual("TEST");
  });

  it("Can create with when condition", () => {
    const TestSwitch = createSwitch<string, string>().when(
      (v: string) => v.length === 4,
      "TEST",
    );

    expect(TestSwitch.one("test")).toEqual("TEST");
  });

  it("Can create with any of condition", () => {
    const TestSwitch = createSwitch<string, string>().anyOf(
      ["test", "test2"],
      "TEST",
    );

    expect(TestSwitch.one("test")).toEqual("TEST");
  });

  it("Can create with none of condition", () => {
    const TestSwitch = createSwitch<string, string>().noneOf(
      ["test", "test2"],
      "TEST",
    );

    expect(TestSwitch.one("X")).toEqual("TEST");
  });

  it("Allow to add condition", () => {
    const TestSwitch = createSwitch<string, string>().add(
      eqCondition("test", "TEST"),
    );

    expect(TestSwitch.one("test")).toEqual("TEST");
  });

  it("Supports multi results value", () => {
    const TestSwitch = createSwitch<string, string>().add(
      eqCondition("test", "TEST"),
      createCondition((v) => v.length === 4, "TEST2"),
    );

    expect(TestSwitch.all("test")).toEqual(["TEST", "TEST2"]);
  });
});
