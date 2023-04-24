import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pipeline } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { usePipelines } from "./usePipelines";

export const usePipelinesHaveTargetSource = ({
  sourceId,
  accessToken,
  enabled,
  retry,
}: {
  sourceId: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  const pipelines = usePipelines({ enabled, accessToken, retry });
  const queryClient = useQueryClient();

  let enableQuery = false;

  if (sourceId && pipelines.isSuccess && enabled) {
    enableQuery = true;
  }

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
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
