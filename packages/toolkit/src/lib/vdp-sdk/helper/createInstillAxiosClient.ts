import { env } from "../../utility";
import axios from "axios";
import { Nullable } from "../../type";

export const createInstillAxiosClient = (accessToken: Nullable<string>) => {
  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};

  return axios.create({
    baseURL: `${env("NEXT_PUBLIC_API_GATEWAY_BASE_URL")}/${env(
      "NEXT_PUBLIC_API_VERSION"
    )}`,
    headers,
  });
};
