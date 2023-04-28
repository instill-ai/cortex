import { Nullable } from "../../type";

export const getQueryString = (
  baseUrl: string,
  pageSize: Nullable<number>,
  nextPageToken: Nullable<string>
) => {
  let url = baseUrl;

  if (pageSize || nextPageToken) {
    // Check if the baseUrl already has a query string
    if (baseUrl.includes("?")) {
      url += "&";
    } else {
      url += "?";
    }
  }

  if (pageSize) {
    url += `pageSize=${pageSize}&`;
  }

  if (nextPageToken) {
    url += `pageToken=${nextPageToken}&`;
  }

  // Remove the trailing '&' if there are any query parameters
  if (url.endsWith("&")) {
    url = url.slice(0, -1);
  }

  return url;
};
