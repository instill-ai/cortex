import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserQuery, User } from "../../vdp-sdk";

export const useUser = () => {
  const queryClient = useQueryClient();
  return useQuery<User>(
    ["user"],
    async () => {
      const user = await getUserQuery();
      return Promise.resolve(user);
    },
    {
      enabled: true,
      initialData: queryClient.getQueryData(["user"]),
      retry: 3,
    }
  );
};
