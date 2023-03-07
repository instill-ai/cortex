import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pipeline } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { usePipelines } from "./usePipelines";

export const usePipelinesHaveTargetSource = (sourceId: Nullable<string>) => {
  const pipelines = usePipelines(true);
  const queryClient = useQueryClient();

  return useQuery(
    ["pipelines", "source", sourceId],
    async () => {
      const targetPipelines = [];

      if (!pipelines.data) {
        return Promise.reject("pipelines not exist");
      }

      for (const pipeline of pipelines.data) {
        if (pipeline.recipe.source.id === sourceId) {
          targetPipelines.push(pipeline);
        }
      }

      return Promise.resolve(targetPipelines);
    },
    {
      initialData: () => {
        const pipelines = queryClient.getQueryData<Pipeline[]>(["pipelines"]);

        if (pipelines) {
          const targetPipelines = [];

          for (const pipeline of pipelines) {
            if (pipeline.recipe.source.id === sourceId) {
              targetPipelines.push(pipeline);
            }
          }

          return targetPipelines;
        }
      },
      enabled: sourceId ? (pipelines.data ? true : false) : false,
      retry: 3,
    }
  );
};
