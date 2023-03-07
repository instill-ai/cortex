import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLocalUserMutation, User } from "../../vdp-sdk";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: Partial<User>) => {
      const user = await updateLocalUserMutation(payload);
      return Promise.resolve(user);
    },
    {
      onSuccess: (newUser) => {
        queryClient.setQueryData<User>(["user", newUser.name], newUser);
      },
    }
  );
};
