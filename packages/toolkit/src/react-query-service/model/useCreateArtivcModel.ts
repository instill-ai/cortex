import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  createArtivcModelMutation,
  CreateArtivcModelPayload,
} from "../../vdp-sdk";

export const useCreateArtivcModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: CreateArtivcModelPayload;
      accessToken: Nullable<string>;
    }) => {
      const operation = await createArtivcModelMutation({
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
