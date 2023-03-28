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
  enable,
}: {
  sourceName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  let enableQuery = false;

  if (sourceName && enable) {
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
      retry: 3,
    }
  );
};
