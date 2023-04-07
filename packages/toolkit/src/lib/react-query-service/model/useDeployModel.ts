import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { deployModelAction, getModelQuery, type Model } from "../../vdp-sdk";

export const useDeployModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      modelName,
      accessToken,
    }: {
      modelName: string;
      accessToken: Nullable<string>;
    }) => {
      try {
        const operation = await deployModelAction({
          modelName,
          accessToken,
        });
        return Promise.resolve({ operation, modelName });
      } catch (err) {
        return Promise.reject(err);
      }
    },
    {
      onSuccess: ({ modelName }) => {
        queryClient.invalidateQueries(["models", modelName]);
        queryClient.invalidateQueries(["models"]);
        queryClient.invalidateQueries(["models", "watch"]);
        queryClient.invalidateQueries(["models", modelName, "watch"]);
      },
    }
  );
};
