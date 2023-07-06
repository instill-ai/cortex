import { useQuery } from "@tanstack/react-query";
import { watchConnector } from "../../vdp-sdk";
import type { Nullable } from "../../type";

export function useWatchConnector({
  connectorName,
  accessToken,
  enabled,
  retry,
}: {
  connectorName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) {
  let enableQuery = false;

  if (connectorName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["connectors", connectorName, "watch"],
    async () => {
      if (!connectorName) {
        return Promise.reject(new Error("Invalid connector name"));
      }

      const watch = await watchConnector({
        connectorName,
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
