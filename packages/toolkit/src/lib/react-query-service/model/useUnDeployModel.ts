import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unDeployModeleAction } from "../../vdp-sdk";
import type { Nullable } from "../../type";

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
