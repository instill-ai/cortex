import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { updateUserMutation, User } from "../../vdp-sdk";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: Partial<User>;
      accessToken: Nullable<string>;
    }) => {
      const user = await updateUserMutation({ payload, accessToken });
      return Promise.resolve(user);
    },
    {
      onSuccess: (newUser) => {
        queryClient.setQueryData<User>(["user", newUser.name], newUser);
      },
    }
  );
};
