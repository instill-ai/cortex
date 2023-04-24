import { useQuery } from "@tanstack/react-query";

import { DestinationWithPipelines } from "../../../vdp-sdk";
import { usePipelines } from "../../pipeline";
import { Nullable } from "../../../type";
import { useDestination } from "./useDestination";

export const useDestinationWithPipelines = ({
  destinationName,
  accessToken,
  enabled,
  retry,
}: {
  destinationName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  retry?: number;
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
        (e) => e.recipe.destination.name === destinationName
      );

      const destinationWithPipelines: DestinationWithPipelines = {
        ...destination.data,
        pipelines: targetPipelines,
      };

      return Promise.resolve(destinationWithPipelines);
    },
    {
      enabled: enableQuery,
      retry: retry ? retry : 3,
    }
  );
};
