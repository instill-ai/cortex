import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  createHuggingFaceModelMutation,
  CreateHuggingFaceModelPayload,
} from "../../vdp-sdk";

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
        queryClient.invalidateQueries(["models"]);
      },
    }
  );
};
