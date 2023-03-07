import { useQuery } from "@tanstack/react-query";
import {
  getSourceDefinitionQuery,
  getSourceQuery,
  SourceWithDefinition,
} from "../../../vdp-sdk";
import { Nullable } from "../../../type";

export const useSource = (sourceName: Nullable<string>) => {
  return useQuery(
    ["sources", sourceName],
    async () => {
      if (!sourceName) {
        return Promise.reject(new Error("invalid source id"));
      }

      const source = await getSourceQuery(sourceName);
      const sourceDefinition = await getSourceDefinitionQuery(
        source.source_connector_definition
      );
      const sourceWithDefinition: SourceWithDefinition = {
        ...source,
        source_connector_definition: sourceDefinition,
      };
      return Promise.resolve(sourceWithDefinition);
    },
    {
      enabled: sourceName ? true : false,
      retry: 3,
    }
  );
};
