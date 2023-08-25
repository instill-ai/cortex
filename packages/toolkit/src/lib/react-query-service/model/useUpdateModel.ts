import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getComponentsFromPipelineRecipe, removeObjKey } from "../../utility";
import {
  updateModelMutation,
  watchModel,
  type Model,
  type ModelsWatchState,
  type ModelWatchState,
  type UpdateModelPayload,
  ModelWithPipelines,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";
import { fetchPipelines } from "../pipeline";

export const useUpdateModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: UpdateModelPayload;
      accessToken: Nullable<string>;
    }) => {
      const model = await updateModelMutation({ payload, accessToken });
      return Promise.resolve({ model, accessToken });
    },
    {
      onSuccess: async ({ model, accessToken }) => {
        queryClient.setQueryData<Model>(["models", model.name], model);
        queryClient.setQueryData<Model[]>(["models"], (old) =>
          old ? [...old.filter((e) => e.name !== model.name), model] : [model]
        );

        // Invalidate readme
        queryClient.invalidateQueries(["models", model.name, "readme"]);

        // process watch state
        const watch = await watchModel({
          modelName: model.name,
          accessToken,
        });

        queryClient.setQueryData<ModelWatchState>(
          ["models", model.name, "watch"],
          watch
        );

        queryClient.setQueryData<ModelsWatchState>(
          ["models", "watch"],
          (old) =>
            old
              ? {
                  ...removeObjKey(old, model.name),
                  [model.name]: watch,
                }
              : { [model.name]: watch }
        );

        // Process model with pipelines query
        const pipelines = await fetchPipelines(accessToken);

        const targetPipelines = pipelines.filter((e) => {
          const components = getComponentsFromPipelineRecipe({
            recipe: e.recipe,
            connectorResourceType: "CONNECTOR_TYPE_AI",
          });

          return components.some((e) => e.resource_detail.id === model.id);
        });

        const modelWithPipelines: ModelWithPipelines = {
          ...model,
          pipelines: targetPipelines,
        };

        queryClient.setQueryData<ModelWithPipelines>(
          ["models", model.name, "with-pipelines"],
          modelWithPipelines
        );
      },
    }
  );
};
