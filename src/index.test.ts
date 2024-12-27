import { expect, test } from "bun:test";
import { toFlag } from "./index";

test("country code to flag conversion", () => {
  expect(toFlag("US")).toBe("🇺🇸");
  expect(toFlag("GB")).toBe("🇬🇧");
  expect(toFlag("FR")).toBe("🇫🇷");
  expect(toFlag("DE")).toBe("🇩🇪");
  expect(toFlag("JP")).toBe("🇯🇵");
});

test("locale code to flag conversion", () => {
  expect(toFlag("en-US")).toBe("🇺🇸");
  expect(toFlag("en-GB")).toBe("🇬🇧");
  expect(toFlag("fr-FR")).toBe("🇫🇷");
  expect(toFlag("de-DE")).toBe("🇩🇪");
  expect(toFlag("ja-JP")).toBe("🇯🇵");
});

test("case insensitive handling", () => {
  expect(toFlag("us")).toBe("🇺🇸");
  expect(toFlag("gb")).toBe("🇬🇧");
  expect(toFlag("en-gb")).toBe("🇬🇧");
  expect(toFlag("EN-GB")).toBe("🇬🇧");
});

test("caching behavior", () => {
  const result1 = toFlag("US");
  const result2 = toFlag("US");
  expect(result1).toBe(result2);
  
  const result3 = toFlag("en-US");
  const result4 = toFlag("en-US");
  expect(result3).toBe(result4);
});

test("error handling", () => {
  expect(() => toFlag("")).toThrow("Invalid code");
  expect(() => toFlag("USA")).toThrow("Invalid code");
  expect(() => toFlag("U")).toThrow("Invalid code");
});

test("common country codes", () => {
  const commonCodes = [
    "US", "GB", "DE", "FR", "IT", 
    "ES", "RU", "CN", "JP", "KR"
  ];
  
  for (const code of commonCodes) {
    expect(() => toFlag(code)).not.toThrow();
    expect(() => toFlag(`en-${code}`)).not.toThrow();
  }
});
