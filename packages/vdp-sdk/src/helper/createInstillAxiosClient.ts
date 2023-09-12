import { env } from "@instill-ai/toolkit";
import axios from "axios";
import { Nullable } from "@instill-ai/toolkit";

export function createInstillAxiosClient(
  accessToken: Nullable<string>,
  apiGatewayType: "base" | "model" | "vdp"
) {
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

  let baseURL: Nullable<string> = null;

  if (apiGatewayType === "base") {
    baseURL = `${
      process.env.NEXT_SERVER_BASE_API_GATEWAY_URL ??
      env("NEXT_PUBLIC_BASE_API_GATEWAY_URL")
    }/${env("NEXT_PUBLIC_API_VERSION")}`;
  } else if (apiGatewayType === "model") {
    baseURL = `${
      process.env.NEXT_SERVER_MODEL_API_GATEWAY_URL ??
      env("NEXT_PUBLIC_MODEL_API_GATEWAY_URL")
    }/${env("NEXT_PUBLIC_API_VERSION")}`;
  } else if (apiGatewayType === "vdp") {
    baseURL = `${
      process.env.NEXT_SERVER_VDP_API_GATEWAY_URL ??
      env("NEXT_PUBLIC_VDP_API_GATEWAY_URL")
    }/${env("NEXT_PUBLIC_API_VERSION")}`;
  }

  if (!baseURL) {
    throw new Error("Base URL is not defined");
  }

  return axios.create({
    baseURL,
    headers,
  });
}
