import { deletePipelineMutation, Pipeline } from "../../vdp-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";

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
        const pipelineId = pipelineName.split("/")[1];

        queryClient.removeQueries(["pipelines", pipelineId], { exact: true });

        const pipelines = queryClient.getQueryData<Pipeline[]>(["pipelines"]);

        if (pipelines) {
          queryClient.setQueryData<Pipeline[]>(
            ["pipelines"],
            pipelines.filter((e) => e.name !== pipelineName)
          );
        }
      },
    }
  );
};
