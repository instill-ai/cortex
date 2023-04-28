import { test, expect } from "vitest";
import { getQueryString } from "./getQueryString";

test("baseUrl contains no query string", () => {
  const baseUrl = "https://www.google.com";
  const pageSize = 10;
  const nextPageToken = "nextPageToken";

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe(
    "https://www.google.com?page_size=10&page_token=nextPageToken"
  );
});

test("baseUrl contains a query string", () => {
  const baseUrl = "https://www.google.com?q=hello";
  const pageSize = 10;
  const nextPageToken = "nextPageToken";

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe(
    "https://www.google.com?q=hello&page_size=10&page_token=nextPageToken"
  );
});

test("pageSize is null", () => {
  const baseUrl = "https://www.google.com";
  const pageSize = null;
  const nextPageToken = "nextPageToken";

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe("https://www.google.com?page_token=nextPageToken");
});

test("nextPageToken is null", () => {
  const baseUrl = "https://www.google.com";
  const pageSize = 10;
  const nextPageToken = null;

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe("https://www.google.com?page_size=10");
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
    "https://www.google.com?q=hello&page_token=nextPageToken"
  );
});

test("baseUrl contains a query string, nextPageToken is null", () => {
  const baseUrl = "https://www.google.com?q=hello";
  const pageSize = 10;
  const nextPageToken = null;

  const queryString = getQueryString(baseUrl, pageSize, nextPageToken);

  expect(queryString).toBe("https://www.google.com?q=hello&page_size=10");
});
