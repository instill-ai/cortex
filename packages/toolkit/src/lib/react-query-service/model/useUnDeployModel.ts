import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { getModelQuery, unDeployModeleAction, type Model } from "../../vdp-sdk";

export const useUnDeployModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      modelName,
      accessToken,
    }: {
      modelName: string;
      accessToken: Nullable<string>;
    }) => {
      const operation = await unDeployModeleAction({
        modelName,
        accessToken,
      });

      return Promise.resolve({ modelName, operation });
    },
    {
      onSuccess: ({ modelName }) => {
        queryClient.invalidateQueries(["models", modelName]);
        queryClient.invalidateQueries(["models"]);
      },
    }
  );
};
