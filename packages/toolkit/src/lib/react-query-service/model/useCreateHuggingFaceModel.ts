import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createHuggingFaceModelMutation,
  type CreateHuggingFaceModelPayload,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useCreateHuggingFaceModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: CreateHuggingFaceModelPayload;
      accessToken: Nullable<string>;
    }) => {
      const operation = await createHuggingFaceModelMutation({
        payload,
        accessToken,
      });
      return Promise.resolve({ operation });
    },
    {
      onSuccess: () => {
        // Because create model is a long running operation, we will not
        // query the model and update the cache mediately. We left this
        // decision to the user.
        queryClient.invalidateQueries(["models"]);
        queryClient.invalidateQueries(["models", "watch"]);
      },
    }
  );
};
