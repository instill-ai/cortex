import { env } from "../../utility";
import axios from "axios";
import { Nullable } from "../../type";

export function createInstillAxiosClient(accessToken: Nullable<string>) {
  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
        "CF-Access-Client-Id": env("CF_ACCESS_CLIENT_ID")
          ? env("CF_ACCESS_CLIENT_ID")
          : undefined,
        "CF-Access-Client-Secret": env("CF_ACCESS_CLIENT_SECRET")
          ? env("CF_ACCESS_CLIENT_SECRET")
          : undefined,
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
