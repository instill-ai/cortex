import { Nullable } from "../../type";
import { env } from "../../utility";
import { createInstillAxiosClient } from "../helper";
import { User } from "./types";

export type GetUserResponse = {
  user: User;
};

export const getUserQuery = async (
  accessToken: Nullable<string>
): Promise<User> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetUserResponse>(
      `${env("NEXT_PUBLIC_API_VERSION")}/user`
    );

    return Promise.resolve(data.user);
  } catch (err) {
    return Promise.reject(err);
  }
};
