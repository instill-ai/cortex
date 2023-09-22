import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";

export async function authLogoutAction({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "base");

    await client.post("/auth/logout");
  } catch (err) {
    return Promise.reject(err);
  }
}

export type AuthLoginActionPayload = {
  username: string;
  password: string;
};

export async function authLoginAction({
  payload,
}: {
  payload: AuthLoginActionPayload;
}) {
  try {
    const client = createInstillAxiosClient(null, "base");

    await client.post("/auth/login", payload);
  } catch (err) {
    return Promise.reject(err);
  }
}
