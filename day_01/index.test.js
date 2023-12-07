import { describe, expect, it } from "vitest";
import { handleBoring, processValues } from "./index.js";

describe("test files", () => {
  it("should read it boring", async () => {
    const _value = await handleBoring("test-files/sanity.txt");
  });
  it("should be the same for 10", async () => {
    const expected = await handleBoring("test-files/values_test.txt");
    const values10 = await processValues("test-files/values_test.txt", 10);
    expect(values10).toEqual(expected);
  });

  it("should be the same for 11", async () => {
    const expected = await handleBoring("test-files/values_test.txt");
    const values11 = await processValues("test-files/values_test.txt", 11);
    expect(values11).toEqual(expected);
  });

  it("should be the same for 12", async () => {
    const expected = await handleBoring("test-files/values_test.txt");
    const values12 = await processValues("test-files/values_test.txt", 12);
    expect(values12).toEqual(expected);
  });

  it("should handle larger files", async () => {
    const expected = await handleBoring("test-files/letters.txt");
    const defaultChunks = await processValues("test-files/letters.txt");
    expect(defaultChunks).toEqual(expected);
  });

  it("should handle big big files", async () => {
    const expected = await handleBoring("test-files/letters_challenge.txt");
    const defaultBigChunks = await processValues(
      "test-files/letters_challenge.txt"
    );
    expect(defaultBigChunks).toEqual(expected);
  });

  it("should boring big file time", async () => {
    await handleBoring("test-files/letters_challenge.txt");
  });
  it("should process big big", async () => {
    await processValues("test-files/letters_challenge.txt");
  });
});
