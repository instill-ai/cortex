import { useQuery } from "@tanstack/react-query";
import {
  getSourceDefinitionQuery,
  getSourceQuery,
  SourceWithDefinition,
} from "../../../vdp-sdk";
import { Nullable } from "../../../type";

export const useSource = ({
  sourceName,
  accessToken,
  enabled,
  retry,
}: {
  sourceName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  let enableQuery = false;

  if (sourceName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["sources", sourceName],
    async () => {
      if (!sourceName) {
        return Promise.reject(new Error("invalid source id"));
      }

      const source = await getSourceQuery({ sourceName, accessToken });
      const sourceDefinition = await getSourceDefinitionQuery({
        sourceDefinitionName: source.source_connector_definition,
        accessToken,
      });
      const sourceWithDefinition: SourceWithDefinition = {
        ...source,
        source_connector_definition: sourceDefinition,
      };
      return Promise.resolve(sourceWithDefinition);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
