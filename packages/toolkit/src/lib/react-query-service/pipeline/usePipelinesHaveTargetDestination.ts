import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pipeline } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { usePipelines } from "./usePipelines";

export const usePipelinesHaveTargetDestination = ({
  destinationId,
  accessToken,
  enable,
}: {
  destinationId: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  const pipelines = usePipelines({ enable, accessToken });
  const queryClient = useQueryClient();

  let enableQuery = false;

  if (destinationId && pipelines.isSuccess && enable) {
    enableQuery = true;
  }

  return useQuery(
    ["pipelines", "destination", destinationId],
    async () => {
      const targetPipelines = [];

      if (!pipelines.data) {
        return Promise.reject("pipelines not exist");
      }

      for (const pipeline of pipelines.data) {
        if (pipeline.recipe.destination.id === destinationId) {
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
            if (pipeline.recipe.destination.id === destinationId) {
              targetPipelines.push(pipeline);
            }
          }

          return targetPipelines;
        }
      },
      enabled: enableQuery,
      retry: 3,
    }
  );
};
