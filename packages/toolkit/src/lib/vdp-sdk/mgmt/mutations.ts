import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";
import { User } from "./types";

export type UpdateUserResponse = {
  user: User;
};

export const updateLocalUserMutation = async ({
  payload,
  accessToken,
}: {
  payload: Partial<User>;
  accessToken: Nullable<string>;
}): Promise<User> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.patch("/user", payload);

    return Promise.resolve(data.user);
  } catch (err) {
    return Promise.reject(err);
  }
};
