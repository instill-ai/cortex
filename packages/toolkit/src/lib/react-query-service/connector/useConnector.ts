import { useQuery } from "@tanstack/react-query";
import {
  ConnectorType,
  ConnectorWithDefinition,
  getConnectorDefinitionQuery,
  getConnectorQuery,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useConnector = ({
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
}) => {
  let enableQuery = false;

  if (connectorName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["connectors", connectorName],
    async () => {
      if (!connectorName) {
        return Promise.reject(new Error("Invalid connector name"));
      }

      const connector = await getConnectorQuery({ connectorName, accessToken });
      const connectorDefinition = await getConnectorDefinitionQuery({
        connectorDefinitionName: connector.connector_definition,
        accessToken,
      });
      const connectorWithDefinition: ConnectorWithDefinition = {
        ...connector,
        connector_definition: connectorDefinition,
      };
      return Promise.resolve(connectorWithDefinition);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
