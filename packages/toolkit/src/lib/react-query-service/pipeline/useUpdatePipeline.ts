import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  updatePipelineMutation,
  watchPipeline,
  type Pipeline,
  type PipelinesWatchState,
  type PipelineWatchState,
  type UpdatePipelinePayload,
} from "../../vdp-sdk";
import { constructPipelineRecipeWithDefinition } from "../helper";
import { removeObjKey } from "../../utility";

export const useUpdatePipeline = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: UpdatePipelinePayload;
      accessToken: Nullable<string>;
    }) => {
      const rawPipeline = await updatePipelineMutation({
        payload,
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
