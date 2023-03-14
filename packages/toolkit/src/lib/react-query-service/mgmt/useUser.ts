import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { getUserQuery, User } from "../../vdp-sdk";

export const useUser = ({ accessToken }: { accessToken: Nullable<string> }) => {
  const queryClient = useQueryClient();
  return useQuery<User>(
    ["user"],
    async () => {
      const user = await getUserQuery({ accessToken });
      return Promise.resolve(user);
    },
    {
      enabled: true,
      initialData: queryClient.getQueryData(["user"]),
      retry: 3,
    }
  );
};
