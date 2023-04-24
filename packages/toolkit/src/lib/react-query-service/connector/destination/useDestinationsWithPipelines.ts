import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";

import { DestinationWithPipelines } from "../../../vdp-sdk";
import { usePipelines } from "../../pipeline";
import { useDestinations } from "./useDestinations";

export const useDestinationsWithPipelines = ({
  accessToken,
  enabled,
  retry,
}: {
  accessToken: Nullable<string>;
  enabled: boolean;
  retry?: number;
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
          (e) => e.recipe.destination.id === destination.id
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
      retry: retry ? retry : 3,
    }
  );
};
