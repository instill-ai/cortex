import { useQuery } from "@tanstack/react-query";
import { env } from "../../../utility";
import {
  getSourceDefinitionQuery,
  listSourcesQuery,
  SourceWithDefinition,
} from "../../../vdp-sdk";
import type { Nullable } from "../../../type";

export async function fetchSources(accessToken: Nullable<string>) {
  try {
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
  } catch (err) {
    return Promise.reject(err);
  }
}

export const useSources = ({
  accessToken,
  enabled,
  retry,
}: {
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery(
    ["sources"],
    async () => {
      const sources = await fetchSources(accessToken);
      return Promise.resolve(sources);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
