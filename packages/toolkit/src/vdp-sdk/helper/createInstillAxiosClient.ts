import { env } from "../../utility";
import axios from "axios";
import * as https from "https";

export const createInstillAxiosClient = () => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized:
      env("NEXT_PUBLIC_SELF_SIGNED_CERTIFICATION") === "true" ? false : true,
  });

  return axios.create({
    baseURL: `${env("NEXT_PUBLIC_API_GATEWAY_BASE_URL")}/${env(
      "NEXT_PUBLIC_API_VERSION"
    )}`,
    httpsAgent:
      env("NEXT_PUBLIC_SELF_SIGNED_CERTIFICATION") === "true"
        ? httpsAgent
        : undefined,
  });
};
