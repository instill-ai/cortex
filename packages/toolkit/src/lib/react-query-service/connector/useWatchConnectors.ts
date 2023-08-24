import { useQuery } from "@tanstack/react-query";
import {
  watchConnectorResource,
  type ConnectorResourcesWatchState,
  type ConnectorResourceType,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export function useWatchConnectorResources({
  connectorType,
  connectorResourceNames,
  accessToken,
  enabled,
  retry,
}: {
  connectorType: ConnectorResourceType;
  connectorResourceNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) {
  let enableQuery = false;

  if (connectorResourceNames && enabled && connectorResourceNames.length > 0) {
    enableQuery = true;
  }

  return useQuery(
    ["connector-resources", connectorType, "watch"],
    async () => {
      if (!connectorResourceNames || connectorResourceNames.length === 0) {
        return Promise.reject(new Error("Invalid connector name"));
      }

      let watches: ConnectorResourcesWatchState = {};

      for (const connectorResourceName of connectorResourceNames) {
        const watch = await watchConnectorResource({
          connectorResourceName,
          accessToken,
        });
        watches[connectorResourceName] = watch;
      }

      return Promise.resolve(watches);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
}
