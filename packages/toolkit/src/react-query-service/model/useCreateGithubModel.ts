import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  createGithubModelMutation,
  CreateGithubModelPayload,
} from "../../vdp-sdk";

export const useCreateGithubModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: CreateGithubModelPayload;
      accessToken: Nullable<string>;
    }) => {
      const operation = await createGithubModelMutation({
        payload,
        accessToken,
      });
      return Promise.resolve({ operation });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["models"]);
      },
    }
  );
};
