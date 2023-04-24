import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { getUserQuery, User } from "../../vdp-sdk";

export const useUser = ({
  accessToken,
  enabled,
  retry,
}: {
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery<User>(
    ["user"],
    async () => {
      const user = await getUserQuery({ accessToken });
      return Promise.resolve(user);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
