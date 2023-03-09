import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  getModelInstanceQuery,
  ModelInstance,
  unDeployModelInstanceAction,
} from "../../vdp-sdk";

export const useUnDeployModelInstance = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      modelInstanceName,
      accessToken,
    }: {
      modelInstanceName: string;
      accessToken: Nullable<string>;
    }) => {
      const operation = await unDeployModelInstanceAction({
        modelInstanceName,
        accessToken,
      });

      // Get the current model instance staus
      const modelInstance = await getModelInstanceQuery({
        modelInstanceName,
        accessToken,
      });

      return Promise.resolve({ modelInstance, operation });
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
