import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";

import { DestinationWithPipelines } from "../../../vdp-sdk";
import { usePipelines } from "../../pipeline";
import { useDestinations } from "./useDestinations";

export const useDestinationsWithPipelines = ({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) => {
  const destinations = useDestinations({ accessToken });
  const pipelines = usePipelines({ enable: true, accessToken });
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
      enabled: destinations.isSuccess
        ? pipelines.isSuccess
          ? true
          : false
        : false,
      retry: 3,
    }
  );
};
