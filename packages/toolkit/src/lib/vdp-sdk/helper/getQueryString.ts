import { Nullable } from "../../type";

export const getQueryString = (
  baseUrl: string,
  pageSize: Nullable<number>,
  nextPageToken: Nullable<string>
) => {
  let queryString = baseUrl;

  if (pageSize) {
    queryString += `&page_size=${pageSize}`;
  }

  if (nextPageToken) {
    queryString += `&page_token=${nextPageToken}`;
  }

  return queryString;
};
