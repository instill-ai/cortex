import { Nullable } from "../types";
import { createInstillAxiosClient } from "../helper";
import { ApiToken, User } from "./types";

export type UpdateUserResponse = {
  user: User;
};

export async function updateUserMutation({
  payload,
  accessToken,
}: {
  payload: Partial<User>;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "base");

    const { data } = await client.patch<UpdateUserResponse>(
      "/users/me",
      payload
    );

    return Promise.resolve(data.user);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type CreateApiTokenPayload = {
  id: string;
  ttl: number;
};

export type CreateApiTokenResponse = {
  token: ApiToken;
};

export async function createApiTokenMutation({
  payload,
  accessToken,
}: {
  payload: CreateApiTokenPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "base");

    const { data } = await client.post<CreateApiTokenResponse>(
      "/tokens",
      payload
    );

    return Promise.resolve(data.token);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteApiTokenMutation({
  tokenName,
  accessToken,
}: {
  tokenName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "base");

    await client.delete(`/${tokenName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}
