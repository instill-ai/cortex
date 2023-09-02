import { useQuery } from "@tanstack/react-query";
import { env } from "../../utility";
import {
  listUserConnectorResourcesQuery,
  type ConnectorResourceType,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useUserConnectorResources = ({
  userName,
  connectorResourceType,
  accessToken,
  enabled,
  retry,
}: {
  userName: string;
  connectorResourceType: Nullable<ConnectorResourceType>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery(
    [
      "connector-resources",
      connectorResourceType ? connectorResourceType : "all",
    ],
    async () => {
      const connectorResourcesWithDefinition =
        await listUserConnectorResourcesQuery({
          userName,
          pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
          nextPageToken: null,
          accessToken,
          filter: connectorResourceType
            ? `connector_type=${connectorResourceType}`
            : null,
        });

      return Promise.resolve(connectorResourcesWithDefinition);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
