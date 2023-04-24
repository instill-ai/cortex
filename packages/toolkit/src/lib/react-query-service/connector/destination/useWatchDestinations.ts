import { useQuery } from "@tanstack/react-query";
import type { Nullable } from "../../../type";
import { watchDestination, type ConnectorsWatchState } from "../../../vdp-sdk";

export function useWatchDestinations({
  destinationNames,
  accessToken,
  enabled,
  retry,
}: {
  destinationNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) {
  let enableQuery = false;

  if (destinationNames && enabled && destinationNames.length > 0) {
    enableQuery = true;
  }

  return useQuery(
    ["destinations", "watch"],
    async () => {
      if (!destinationNames || destinationNames.length === 0) {
        return Promise.reject(new Error("Destination names not provided"));
      }

      let watches: ConnectorsWatchState = {};

      for (const destinationName of destinationNames) {
        const watch = await watchDestination({
          destinationName,
          accessToken,
        });
        watches[destinationName] = watch;
      }

      return Promise.resolve(watches);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
}
