import { env } from "../../utility";
import axios from "axios";
import { Nullable } from "../../type";

export function createInstillAxiosClient(accessToken: Nullable<string>) {
  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};

  return axios.create({
    baseURL: `${
      process.env.NEXT_SERVER_API_GATEWAY_BASE_URL ??
      env("NEXT_PUBLIC_API_GATEWAY_BASE_URL")
    }/${env("NEXT_PUBLIC_API_VERSION")}`,
    headers,
  });
}
