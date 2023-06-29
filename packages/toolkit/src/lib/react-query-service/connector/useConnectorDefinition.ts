import { useQuery } from "@tanstack/react-query";
import { getConnectorDefinitionQuery } from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useConnectorDefinition = ({
  connectorDefinitionName,
  accessToken,
  enabled,
  retry,
}: {
  connectorDefinitionName: string;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery(
    ["connector-definition", connectorDefinitionName],
    async () => {
      const connectorDefinition = await getConnectorDefinitionQuery({
        connectorDefinitionName,
        accessToken,
      });
      return Promise.resolve(connectorDefinition);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
