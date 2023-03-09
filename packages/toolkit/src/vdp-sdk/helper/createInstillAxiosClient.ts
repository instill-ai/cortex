import { env } from "../../utility";
import axios from "axios";

export const createInstillAxiosClient = (authToken?: string) => {
  return axios.create({
    baseURL: `${env("NEXT_PUBLIC_API_GATEWAY_BASE_URL")}/${env(
      "NEXT_PUBLIC_API_VERSION"
    )}`,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
    },
  });
};
