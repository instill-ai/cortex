import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deployModelAction } from "../../vdp-sdk";
import type { Nullable } from "../../type";

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
        console.log("operation", operation);

        return Promise.resolve({ operation, modelName });
      } catch (err) {
        return Promise.reject(err);
      }
    },
    {
      onSuccess: ({ modelName }) => {
        // Because deploy model is a long running operation, we will not
        // query the model and update the cache mediately. We left this
        // decision to the user.

        setTimeout(() => {
          queryClient.invalidateQueries(["models"]);
          queryClient.invalidateQueries(["models", modelName]);
          queryClient.invalidateQueries(["models", "watch"]);
          queryClient.invalidateQueries(["models", modelName, "watch"]);
        }, 3000);
      },
    }
  );
};
