import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { ApiToken, deleteApiTokenMutation } from "../../vdp-sdk";

export const useDeleteApiToken = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      tokenName,
      accessToken,
    }: {
      tokenName: string;
      accessToken: Nullable<string>;
    }) => {
      await deleteApiTokenMutation({ tokenName, accessToken });
      return Promise.resolve(tokenName);
    },
    {
      onSuccess: (tokenName) => {
        queryClient.setQueryData<ApiToken[]>(["api-tokens"], (old) =>
          old ? old.filter((e) => e.name !== tokenName) : []
        );
        queryClient.removeQueries(["api-tokens", tokenName], { exact: true });
      },
    }
  );
};
