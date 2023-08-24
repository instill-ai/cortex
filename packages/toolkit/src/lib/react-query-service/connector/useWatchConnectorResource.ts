import { useQuery } from "@tanstack/react-query";
import { watchConnectorResource } from "../../vdp-sdk";
import type { Nullable } from "../../type";

export function useWatchConnectorResource({
  connectorResourceName,
  accessToken,
  enabled,
  retry,
}: {
  connectorResourceName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) {
  let enableQuery = false;

  if (connectorResourceName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["connector-resources", connectorResourceName, "watch"],
    async () => {
      if (!connectorResourceName) {
        return Promise.reject(new Error("Invalid connector resource name"));
      }

      const watch = await watchConnectorResource({
        connectorResourceName,
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
