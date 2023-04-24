import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";

import { SourceWithPipelines } from "../../../vdp-sdk";
import { usePipelines } from "../../pipeline";
import { useSources } from "./useSources";

export const useSourcesWithPipelines = ({
  accessToken,
  enabled,
  retry,
}: {
  accessToken: Nullable<string>;
  enabled: boolean;
  retry?: number;
}) => {
  const sources = useSources({ accessToken, enabled, retry });
  const pipelines = usePipelines({ accessToken, enabled, retry });

  let enableQuery = false;

  if (sources.isSuccess && pipelines.isSuccess && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["sources", "with-pipelines"],
    async () => {
      if (!sources.data || !pipelines.data) return [];

      const newSources: SourceWithPipelines[] = [];

      for (const source of sources.data) {
        const targetPipelines = pipelines.data.filter(
          (e) => e.recipe.source.id === source.id
        );
        newSources.push({
          ...source,
          pipelines: targetPipelines,
        });
      }

      return newSources;
    },
    {
      enabled: enableQuery,
      retry: retry ? retry : 3,
    }
  );
};
