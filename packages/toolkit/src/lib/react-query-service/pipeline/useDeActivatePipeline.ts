import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeObjKey } from "../../utility";
import {
  deActivatePipelineMutation,
  watchPipeline,
  type Pipeline,
  type PipelinesWatchState,
  type PipelineWatchState,
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
