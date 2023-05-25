import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import type { DestinationWithPipelines } from "../../../vdp-sdk";
import { usePipelines } from "../../pipeline";
import { useDestinations } from "./useDestinations";
import { getComponentFromPipelineRecipe } from "../../../utility";

export const useDestinationsWithPipelines = ({
  accessToken,
  enabled,
  retry,
}: {
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  const destinations = useDestinations({ accessToken, enabled, retry });
  const pipelines = usePipelines({ enabled, accessToken, retry });

  let enableQuery = false;

  if (destinations.isSuccess && pipelines.isSuccess && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["destinations", "with-pipelines"],
    async () => {
      if (!destinations.data || !pipelines.data) return [];

      const newDestinations: DestinationWithPipelines[] = [];

      for (const destination of destinations.data) {
        const targetPipelines = pipelines.data.filter(
          (e) =>
            getComponentFromPipelineRecipe({
              recipe: e.recipe,
              componentName: "destination",
            })?.id === destination.id
        );
        newDestinations.push({
          ...destination,
          pipelines: targetPipelines,
        });
      }

      return newDestinations;
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
