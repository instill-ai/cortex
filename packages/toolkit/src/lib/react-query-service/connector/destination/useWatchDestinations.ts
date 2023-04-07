import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { WatchConnectorsState, watchDestination } from "../../../vdp-sdk";

export function useWatchDestinations({
  destinationNames,
  accessToken,
  enable,
}: {
  destinationNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enable: boolean;
}) {
  let enableQuery = false;

  if (destinationNames && enable && destinationNames.length > 0) {
    enableQuery = true;
  }

  return useQuery(
    ["destinations", "watch"],
    async () => {
      if (!destinationNames || destinationNames.length === 0) {
        return Promise.reject(new Error("Destination names not provided"));
      }

      let watches: WatchConnectorsState = {};

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
      retry: 3,
      enabled: enableQuery,
    }
  );
}
