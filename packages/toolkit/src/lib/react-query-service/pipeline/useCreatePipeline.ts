import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constructPipelineRecipeWithDefinition } from "../helper";
import { removeObjKey } from "../../utility";
import {
  watchPipeline,
  createPipelineMutation,
  type CreatePipelinePayload,
  type Pipeline,
  type PipelinesWatchState,
  type PipelineWatchState,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useCreatePipeline = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: CreatePipelinePayload;
      accessToken: Nullable<string>;
    }) => {
      const res = await createPipelineMutation({ payload, accessToken });
      return Promise.resolve({ newPipeline: res, accessToken });
    },
    {
      onSuccess: async ({ newPipeline, accessToken }) => {
        const recipe = await constructPipelineRecipeWithDefinition({
          rawRecipe: newPipeline.recipe,
          accessToken,
        });

        const pipeline: Pipeline = {
          ...newPipeline,
          recipe: recipe,
        };

        queryClient.setQueryData<Pipeline>(
          ["pipelines", newPipeline.id],
          pipeline
        );

        queryClient.setQueryData<Pipeline[]>(["pipelines"], (old) =>
          old
            ? [...old.filter((e) => e.id !== newPipeline.id), pipeline]
            : [pipeline]
        );

        // process watch state

        const watch = await watchPipeline({
          pipelineName: pipeline.name,
          accessToken,
        });

        queryClient.setQueryData<PipelineWatchState>(
          ["pipelines", pipeline.name, "watch"],
          watch
        );

        queryClient.setQueryData<PipelinesWatchState>(
          ["pipelines", "watch"],
          (old) =>
            old
              ? {
                  ...removeObjKey(old, pipeline.name),
                  [pipeline.name]: watch,
                }
              : { [pipeline.name]: watch }
        );
      },
    }
  );
};
