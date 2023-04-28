import { useMutation, useQueryClient } from "@tanstack/react-query";
import { constructPipelineRecipeWithDefinition } from "../helper";
import { removeObjKey } from "../../utility";
import {
  activatePipelineMutation,
  watchPipeline,
  type Pipeline,
  type PipelinesWatchState,
  type PipelineWatchState,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useActivatePipeline = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      pipelineName,
      accessToken,
    }: {
      pipelineName: string;
      accessToken: Nullable<string>;
    }) => {
      const rawPipeline = await activatePipelineMutation({
        pipelineName,
        accessToken,
      });
      const recipe = await constructPipelineRecipeWithDefinition({
        rawRecipe: rawPipeline.recipe,
        accessToken,
      });

      const pipeline: Pipeline = {
        ...rawPipeline,
        recipe: recipe,
      };

      return Promise.resolve({ pipeline, accessToken });
    },
    {
      onSuccess: async ({ pipeline, accessToken }) => {
        queryClient.setQueryData<Pipeline>(
          ["pipelines", pipeline.name],
          pipeline
        );
        queryClient.setQueryData<Pipeline[]>(["pipelines"], (old) =>
          old
            ? [...old.filter((e) => e.name !== pipeline.name), pipeline]
            : [pipeline]
        );

        // Process watch state

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
