import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createArtivcModelMutation,
  CreateArtivcModelPayload,
} from "../../vdp-sdk";

export const useCreateArtivcModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: CreateArtivcModelPayload) => {
      const operation = await createArtivcModelMutation(payload);
      return Promise.resolve({ operation });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["models"]);
      },
    }
  );
};
