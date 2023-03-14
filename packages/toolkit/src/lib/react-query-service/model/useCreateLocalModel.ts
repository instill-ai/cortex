import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  createLocalModelMutation,
  CreateLocalModelPayload,
} from "../../vdp-sdk";

export const useCreateLocalModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: CreateLocalModelPayload;
      accessToken: Nullable<string>;
    }) => {
      const operation = await createLocalModelMutation({
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
