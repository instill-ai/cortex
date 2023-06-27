import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  renamePipelineMutation,
  watchPipeline,
  type Pipeline,
  type PipelinesWatchState,
  type PipelineWatchState,
  type RenamePipelinePayload,
} from "../../vdp-sdk";
import { removeObjKey } from "../../utility";

export const useRenamePipeline = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: RenamePipelinePayload;
      accessToken: Nullable<string>;
    }) => {
      const pipeline = await renamePipelineMutation({
        payload,
        accessToken,
      });
      return Promise.resolve({
        pipeline,
        accessToken,
        oldPipelineId: payload.pipelineId,
      });
    },
    {
      onSuccess: async ({ pipeline, accessToken, oldPipelineId }) => {
        const oldPipelineName = `pipelines/${oldPipelineId}`;
        queryClient.removeQueries(["pipelines", oldPipelineName]);

        queryClient.setQueryData<Pipeline>(
          ["pipelines", pipeline.name],
          pipeline
        );

        queryClient.setQueryData<Pipeline[]>(["pipelines"], (old) =>
          old
            ? [...old.filter((e) => e.name !== oldPipelineName), pipeline]
            : [pipeline]
        );

        // process watch state
        const watch = await watchPipeline({
          pipelineName: pipeline.name,
          accessToken,
        });

        queryClient.removeQueries(["pipelines", oldPipelineName, "watch"]);

        queryClient.setQueryData<PipelineWatchState>(
          ["pipelines", pipeline.name, "watch"],
          watch
        );

        queryClient.setQueryData<PipelinesWatchState>(
          ["pipelines", "watch"],
          (old) =>
            old
              ? {
                  ...removeObjKey(old, oldPipelineName),
                  [pipeline.name]: watch,
                }
              : { [pipeline.name]: watch }
        );
      },
    }
  );
};
