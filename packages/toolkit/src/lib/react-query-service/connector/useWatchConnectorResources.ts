import { useQuery } from "@tanstack/react-query";
import {
  watchUserConnectorResource,
  type ConnectorResourcesWatchState,
  type ConnectorResourceType,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export function useWatchConnectorResources({
  connectorResourceType,
  connectorResourceNames,
  accessToken,
  enabled,
  retry,
}: {
  connectorResourceType: ConnectorResourceType;
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
    ["connector-resources", connectorResourceType, "watch"],
    async () => {
      if (!connectorResourceNames || connectorResourceNames.length === 0) {
        return Promise.reject(new Error("Invalid connector names"));
      }

      let watches: ConnectorResourcesWatchState = {};

      for (const connectorResourceName of connectorResourceNames) {
        const watch = await watchUserConnectorResource({
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
