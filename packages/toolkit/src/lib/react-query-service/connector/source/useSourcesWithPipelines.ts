import { useQuery } from "@tanstack/react-query";
import { usePipelines } from "../../pipeline";
import { useSources } from "./useSources";
import type { Nullable } from "../../../type";
import type { SourceWithPipelines } from "../../../vdp-sdk";
import { getComponentFromPipelineRecipe } from "../../../utility";

export const useSourcesWithPipelines = ({
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
          (e) =>
            getComponentFromPipelineRecipe({
              recipe: e.recipe,
              componentName: "source",
            })?.resource_detail.id === source.id
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
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
