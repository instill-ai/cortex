import { useQuery } from "@tanstack/react-query";
import { usePipelines } from "../../pipeline";
import { useDestination } from "./useDestination";
import type { DestinationWithPipelines } from "../../../vdp-sdk";
import type { Nullable } from "../../../type";
import { getComponentFromPipelineRecipe } from "../../../utility";

export const useDestinationWithPipelines = ({
  destinationName,
  accessToken,
  enabled,
  retry,
}: {
  destinationName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  const pipelines = usePipelines({ enabled, accessToken, retry });
  const destination = useDestination({
    destinationName,
    accessToken,
    enabled,
    retry,
  });

  let enableQuery = false;

  if (
    destinationName &&
    pipelines.isSuccess &&
    destination.isSuccess &&
    enabled
  ) {
    enableQuery = true;
  }

  return useQuery(
    ["destinations", destinationName, "with-pipelines"],
    async () => {
      if (!destinationName) {
        return Promise.reject(new Error("invalid destination name"));
      }

      if (!destination.data) {
        return Promise.reject(new Error("invalid destination data"));
      }

      if (!pipelines.data) {
        return Promise.reject(new Error("invalid pipeline data"));
      }

      const targetPipelines = pipelines.data.filter(
        (e) =>
          getComponentFromPipelineRecipe({
            recipe: e.recipe,
            componentName: "destination",
          })?.id === destination.data.id
      );

      const destinationWithPipelines: DestinationWithPipelines = {
        ...destination.data,
        pipelines: targetPipelines,
      };

      return Promise.resolve(destinationWithPipelines);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
