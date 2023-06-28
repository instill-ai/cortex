import { useQuery } from "@tanstack/react-query";
import { env } from "../../utility";
import { ConnectorType, listConnectorDefinitionsQuery } from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useConnectorDefinitions = ({
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
    ["connector-definitions", connectorType],
    async () => {
      const connectorDefinitions = await listConnectorDefinitionsQuery({
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
        filter: `connector_type=${connectorType}`,
      });
      return Promise.resolve(connectorDefinitions);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
