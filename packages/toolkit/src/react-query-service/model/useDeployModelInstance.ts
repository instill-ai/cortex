import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  deployModelInstanceAction,
  ModelInstance,
  getModelInstanceQuery,
} from "../../vdp-sdk";

export const useDeployModelInstance = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      modelInstanceName,
      accessToken,
    }: {
      modelInstanceName: string;
      accessToken: Nullable<string>;
    }) => {
      try {
        const operation = await deployModelInstanceAction({
          modelInstanceName,
          accessToken,
        });

        // Get the current model instance staus
        const modelInstance = await getModelInstanceQuery({
          modelInstanceName,
          accessToken,
        });
        return Promise.resolve({ modelInstance, operation });
      } catch (err) {
        return Promise.reject(err);
      }
    },
    {
      onSuccess: ({ modelInstance }) => {
        const modelId = modelInstance.name.split("/")[1];

        queryClient.setQueryData<ModelInstance>(
          ["models", modelId, "modelInstances", modelInstance.id],
          modelInstance
        );

        queryClient.setQueryData<ModelInstance[]>(
          ["models", modelId, "modelInstances"],
          (old) => {
            if (!old) {
              return [modelInstance];
            }

            return [
              ...old.filter((e) => e.id !== modelInstance.id),
              modelInstance,
            ];
          }
        );
      },
    }
  );
};
