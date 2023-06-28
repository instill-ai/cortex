import { useQuery } from "@tanstack/react-query";
import {
  watchConnector,
  type ConnectorsWatchState,
  type ConnectorType,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export function useWatchConnectors({
  connectorType,
  connectorNames,
  accessToken,
  enabled,
  retry,
}: {
  connectorType: ConnectorType;
  connectorNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) {
  let enableQuery = false;

  if (connectorNames && enabled && connectorNames.length > 0) {
    enableQuery = true;
  }

  return useQuery(
    ["connectors", connectorType, "watch"],
    async () => {
      if (!connectorNames || connectorNames.length === 0) {
        return Promise.reject(new Error("Invalid connector name"));
      }

      let watches: ConnectorsWatchState = {};

      for (const connectorName of connectorNames) {
        const watch = await watchConnector({
          connectorName,
          accessToken,
        });
        watches[connectorName] = watch;
      }

      return Promise.resolve(watches);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
}
