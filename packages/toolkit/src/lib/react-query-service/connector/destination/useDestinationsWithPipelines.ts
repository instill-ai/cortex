import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";

import { DestinationWithPipelines } from "../../../vdp-sdk";
import { usePipelines } from "../../pipeline";
import { useDestinations } from "./useDestinations";

export const useDestinationsWithPipelines = ({
  accessToken,
  enable,
}: {
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  const destinations = useDestinations({ accessToken, enable });
  const pipelines = usePipelines({ enable: enable, accessToken });

  let enableQuery = false;

  if (destinations.isSuccess && pipelines.isSuccess && enable) {
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
      retry: 3,
    }
  );
};
