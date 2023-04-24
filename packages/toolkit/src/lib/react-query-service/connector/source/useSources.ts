import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { env } from "../../../utility";
import {
  getSourceDefinitionQuery,
  listSourcesQuery,
  SourceWithDefinition,
} from "../../../vdp-sdk";

export const useSources = ({
  accessToken,
  enabled,
  retry,
}: {
  accessToken: Nullable<string>;
  enabled: boolean;
  retry?: number;
}) => {
  return useQuery(
    ["sources"],
    async () => {
      const sources = await listSourcesQuery({
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
      });
      const sourcesWithDefinition: SourceWithDefinition[] = [];

      for (const source of sources) {
        const sourceDefinition = await getSourceDefinitionQuery({
          sourceDefinitionName: source.source_connector_definition,
          accessToken,
        });
        sourcesWithDefinition.push({
          ...source,
          source_connector_definition: sourceDefinition,
        });
      }

      return Promise.resolve(sourcesWithDefinition);
    },
    {
      enabled,
      retry: retry ? retry : 3,
    }
  );
};
