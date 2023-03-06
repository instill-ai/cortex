import { Nullable } from "../../type";

export const getQueryString = (
  baseUrl: string,
  pageSize: Nullable<number>,
  nextPageToken: Nullable<string>
) => {
  return pageSize
    ? nextPageToken
      ? baseUrl + `&page_size=${pageSize}` + `&page_token=${nextPageToken}`
      : baseUrl + `&page_size=${pageSize}`
    : baseUrl;
};
