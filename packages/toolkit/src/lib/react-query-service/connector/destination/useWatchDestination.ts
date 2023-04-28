import { useQuery } from "@tanstack/react-query";
import { watchDestination } from "../../../vdp-sdk";
import type { Nullable } from "../../../type";

export function useWatchDestination({
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
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
}
