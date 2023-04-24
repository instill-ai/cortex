import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { watchDestination } from "../../../vdp-sdk";

export function useWatchDestination({
  destinationName,
  accessToken,
  enabled,
  retry,
}: {
  destinationName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  retry?: number;
}) {
  let enableQuery = false;

  if (destinationName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["destinations", destinationName, "watch"],
    async () => {
      if (!destinationName) {
        return Promise.reject(new Error("Destination name not provided"));
      }

      const watch = await watchDestination({
        destinationName,
        accessToken,
      });

      return Promise.resolve(watch);
    },
    {
      enabled: enableQuery,
      retry: retry ? retry : 3,
    }
  );
}
