import { test, expect } from "vitest";
import { getQueryString } from "./getQueryString";

test("baseUrl contains no query string", () => {
  const baseUrl = "https://www.google.com";
  const pageSize = 10;
  const nextPageToken = "nextPageToken";

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe(
    "https://www.google.com?pageSize=10&pageToken=nextPageToken"
  );
});

test("baseUrl contains a query string", () => {
  const baseUrl = "https://www.google.com?q=hello";
  const pageSize = 10;
  const nextPageToken = "nextPageToken";

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe(
    "https://www.google.com?q=hello&pageSize=10&pageToken=nextPageToken"
  );
});

test("pageSize is null", () => {
  const baseUrl = "https://www.google.com";
  const pageSize = null;
  const nextPageToken = "nextPageToken";

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe("https://www.google.com?pageToken=nextPageToken");
});

test("nextPageToken is null", () => {
  const baseUrl = "https://www.google.com";
  const pageSize = 10;
  const nextPageToken = null;

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe("https://www.google.com?pageSize=10");
});

test("pageSize and nextPageToken are null", () => {
  const baseUrl = "https://www.google.com";
  const pageSize = null;
  const nextPageToken = null;

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe("https://www.google.com");
});

test("baseUrl contains a query string, pageSize and nextPageToken are null", () => {
  const baseUrl = "https://www.google.com?q=hello";
  const pageSize = null;
  const nextPageToken = null;

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe("https://www.google.com?q=hello");
});

test("baseUrl contains a query string, pageSize is null", () => {
  const baseUrl = "https://www.google.com?q=hello";
  const pageSize = null;
  const nextPageToken = "nextPageToken";

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe(
    "https://www.google.com?q=hello&pageToken=nextPageToken"
  );
});

test("baseUrl contains a query string, nextPageToken is null", () => {
  const baseUrl = "https://www.google.com?q=hello";
  const pageSize = 10;
  const nextPageToken = null;

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe("https://www.google.com?q=hello&pageSize=10");
});
