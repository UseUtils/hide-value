import { HideValue } from "../lib";

describe("HideValue", () => {
  describe("using default null", () => {
    test("should parse a simple object", () => {
      const obj = { a: 1, b: "b", c: true, d: "" };

      const result = HideValue.from(obj);

      expect(result).toEqual({
        a: null,
        b: null,
        c: null,
        d: null,
      });
    });

    test("should parse into object object", () => {
      const obj = { a: 1, b: "b", c: { a: { a: "a" }, b: true } };

      const result = HideValue.from(obj);

      expect(result).toEqual({
        a: null,
        b: null,
        c: { a: { a: null }, b: null },
      });
    });

    test("should parse array into the array", () => {
      const obj = {
        a: 1,
        b: "b",
        c: [{ a: 1, b: true, c: [{ a: 1, b: true }] }],
      };

      const result = HideValue.from(obj);

      expect(result).toEqual({
        a: null,
        b: null,
        c: [{ a: null, b: null, c: [{ a: null, b: null }] }],
      });
    });
  });

  describe("using default with -", () => {
    test("should parse a simple object", () => {
      const obj = { a: 1, b: "b", c: true, d: "" };

      const result = HideValue.from(obj, { default: "-" });

      expect(result).toEqual({
        a: "-",
        b: "-",
        c: "-",
        d: "-",
      });
    });

    test("should parse into object object", () => {
      const obj = { a: 1, b: "b", c: { a: { a: "a" }, b: true } };

      const result = HideValue.from(obj, { default: "-" });

      expect(result).toEqual({
        a: "-",
        b: "-",
        c: { a: { a: "-" }, b: "-" },
      });
    });

    test("should parse array into the array", () => {
      const obj = {
        a: 1,
        b: "b",
        c: [{ a: 1, b: true, c: [{ a: 1, b: true }] }],
      };

      const result = HideValue.from(obj, { default: "-" });

      expect(result).toEqual({
        a: "-",
        b: "-",
        c: [{ a: "-", b: "-", c: [{ a: "-", b: "-" }] }],
      });
    });
  });

  describe("using useBoolean", () => {
    test("should parse a simple object", () => {
      const obj = { a: 1, b: "b", c: true, d: "" };

      const result = HideValue.from(obj, { useBoolean: true });

      expect(result).toEqual({
        a: true,
        b: true,
        c: true,
        d: false,
      });
    });

    test("should parse into object object", () => {
      const obj = { a: 1, b: "b", c: { a: { a: "a" }, b: true } };

      const result = HideValue.from(obj, { useBoolean: true });

      expect(result).toEqual({
        a: true,
        b: true,
        c: { a: { a: true }, b: true },
      });
    });

    test("should parse array into the array", () => {
      const obj = {
        a: 1,
        b: "b",
        c: [{ a: 1, b: true, c: [{ a: 1, b: true }] }],
      };

      const result = HideValue.from(obj, { useBoolean: true });

      expect(result).toEqual({
        a: true,
        b: true,
        c: [{ a: true, b: true, c: [{ a: true, b: true }] }],
      });
    });
  });
});
