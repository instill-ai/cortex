import { useQuery } from "@tanstack/react-query";
import { env } from "../../utility";
import {
  ConnectorType,
  ConnectorWithDefinition,
  getConnectorDefinitionQuery,
  listConnectorsQuery,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export async function fetchConnectors(
  filter: Nullable<string>,
  accessToken: Nullable<string>
) {
  try {
    const connectors = await listConnectorsQuery({
      pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
      nextPageToken: null,
      accessToken,
      filter,
    });

    const connectorsWithDefinition: ConnectorWithDefinition[] = [];

    for (const connector of connectors) {
      const definition = await getConnectorDefinitionQuery({
        connectorDefinitionName: connector.connector_definition,
        accessToken,
      });
      connectorsWithDefinition.push({
        ...connector,
        connector_definition: definition,
      });
    }

    return Promise.resolve(connectorsWithDefinition);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const useConnectors = ({
  connectorType,
  accessToken,
  enabled,
  retry,
}: {
  connectorType: ConnectorType;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery(
    ["connectors", connectorType],
    async () => {
      const connectors = await fetchConnectors(
        `connector_type=${connectorType}`,
        accessToken
      );
      return Promise.resolve(connectors);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
