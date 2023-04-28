import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeObjKey } from "../../utility";
import {
  deletePipelineMutation,
  type Pipeline,
  type PipelinesWatchState,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useDeletePipeline = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      pipelineName,
      accessToken,
    }: {
      pipelineName: string;
      accessToken: Nullable<string>;
    }) => {
      await deletePipelineMutation({ pipelineName, accessToken });
      return Promise.resolve(pipelineName);
    },
    {
      onSuccess: (pipelineName) => {
        queryClient.setQueryData<Pipeline[]>(["pipelines"], (old) =>
          old ? old.filter((e) => e.name !== pipelineName) : []
        );
        queryClient.removeQueries(["pipelines", pipelineName], { exact: true });

        // Process watch state
        queryClient.removeQueries(["pipelines", pipelineName, "watch"], {
          exact: true,
        });

        queryClient.setQueryData<PipelinesWatchState>(
          ["pipelines", "watch"],
          (old) => (old ? removeObjKey(old, pipelineName) : {})
        );
      },
    }
  );
};
