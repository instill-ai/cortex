import { useQuery } from "@tanstack/react-query";
import { env } from "../../utility";
import {
  ConnectorResourceType,
  ConnectorResourceWithDefinition,
  getConnectorDefinitionQuery,
  listConnectorResourcesQuery,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useConnectorResources = ({
  connectorResourceType,
  accessToken,
  enabled,
  retry,
}: {
  connectorResourceType: ConnectorResourceType;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery(
    ["connector-resources", connectorResourceType],
    async () => {
      const connectorResources = await listConnectorResourcesQuery({
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
        filter: `connector_type=${connectorResourceType}`,
      });

      const connectorResourcesWithDefinition: ConnectorResourceWithDefinition[] =
        [];

      for (const connectorResource of connectorResources) {
        const definition = await getConnectorDefinitionQuery({
          connectorDefinitionName: connectorResource.connector_definition_name,
          accessToken,
        });
        connectorResourcesWithDefinition.push({
          ...connectorResource,
          connector_definition: definition,
        });
      }

      return Promise.resolve(connectorResourcesWithDefinition);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
