import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { getUserQuery, User } from "../../vdp-sdk";

export const useUser = ({
  accessToken,
  enable,
}: {
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  return useQuery<User>(
    ["user"],
    async () => {
      const user = await getUserQuery({ accessToken });
      return Promise.resolve(user);
    },
    {
      enabled: enable,
      retry: 3,
    }
  );
};
