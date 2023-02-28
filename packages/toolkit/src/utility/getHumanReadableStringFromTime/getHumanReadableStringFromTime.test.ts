import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { getHumanReadableStringFromTime } from "./getHumanReadableStringFromTime";

describe("test getTimeAgo", () => {
  test("should return 1 second ago", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-01T00:00:01"
    );
    assert.strictEqual(result, "a second ago");
  });

  test("should return x seconds ago", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-01T00:00:10"
    );
    assert.strictEqual(result, "10 seconds ago");
  });

  test("should return 1 minute ago", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-01T00:01:00"
    );

    assert.strictEqual(result, "a minute ago");

    const result2 = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-01T00:01:01"
    );

    assert.strictEqual(result2, "a minute ago");
  });

  test("should return x minutes ago", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-01T00:02:00"
    );

    assert.strictEqual(result, "2 minute ago");
  });

  test("should return an hour ago", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-01T01:00:00"
    );

    assert.strictEqual(result, "an hour ago");

    const result2 = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-01T01:01:00"
    );

    assert.strictEqual(result2, "an hour ago");
  });

  test("should return x hours ago", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-01T10:00:00"
    );
    assert.strictEqual(result, "10 hour ago");
  });

  test("should return yesterday", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-02T00:00:00"
    );
    assert.strictEqual(result, "yesterday");

    const result2 = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-02T00:02:00"
    );
    assert.strictEqual(result2, "yesterday");
  });

  test("should return x days ago", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1995-12-10T00:00:00"
    );
    assert.strictEqual(result, "9 days ago");
  });

  test("should return 1 month ago", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1996-01-01T00:00:00"
    );
    assert.strictEqual(result, "last month");

    const result2 = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1996-01-10T00:00:00"
    );
    assert.strictEqual(result2, "last month");
  });

  test("should return x months ago", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1996-03-01T00:00:00"
    );
    assert.strictEqual(result, "3 months ago");
  });

  test("should return Date string", () => {
    const result = getHumanReadableStringFromTime(
      "1995-12-01T00:00:00",
      "1997-03-01T00:00:00"
    );
    assert.strictEqual(result, "Fri Dec 01 1995");
  });
});
