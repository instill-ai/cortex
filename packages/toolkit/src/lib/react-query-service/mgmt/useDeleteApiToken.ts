import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { deleteApiTokenMutation } from "../../vdp-sdk";

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
      return tokenName;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api-tokens"]);
      },
    }
  );
};
