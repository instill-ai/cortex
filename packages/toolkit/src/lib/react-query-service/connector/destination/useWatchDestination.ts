import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { watchDestination } from "../../../vdp-sdk";

export function useWatchDestination({
  destinationName,
  accessToken,
  enable,
}: {
  destinationName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) {
  let enableQuery = false;

  if (destinationName && enable) {
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
      retry: 3,
      enabled: enableQuery,
    }
  );
}
