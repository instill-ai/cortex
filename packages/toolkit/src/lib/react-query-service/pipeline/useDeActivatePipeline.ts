import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeObjKey } from "../../utility";
import {
  deActivatePipelineMutation,
  watchPipeline,
  type Pipeline,
  type PipelinesWatchState,
  type PipelineWatchState,
  getPipelineQuery,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useDeActivatePipeline = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      pipelineName,
      accessToken,
    }: {
      pipelineName: string;
      accessToken: Nullable<string>;
    }) => {
      const pipeline = await deActivatePipelineMutation({
        pipelineName,
        accessToken,
      });

      return Promise.resolve({ pipeline, accessToken });
    },
    {
      onSuccess: async ({ pipeline, accessToken }) => {
        let targetPipeline = queryClient.getQueryData<Pipeline>([
          "pipelines",
          pipeline.name,
        ]);

        if (!targetPipeline) {
          const newPipeline = await getPipelineQuery({
            pipelineName: pipeline.name,
            accessToken,
          });

          targetPipeline = newPipeline;
        }

        const updatedPipeline: Pipeline = {
          ...targetPipeline,
          state: pipeline.state,
          mode: pipeline.mode,
        };

        queryClient.setQueryData<Pipeline>(
          ["pipelines", pipeline.name],
          updatedPipeline
        );

        queryClient.setQueryData<Pipeline[]>(["pipelines"], (old) =>
          old
            ? [...old.filter((e) => e.name !== pipeline.name), updatedPipeline]
            : [updatedPipeline]
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
