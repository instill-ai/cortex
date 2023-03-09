import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";

import { SourceWithPipelines } from "../../../vdp-sdk";
import { usePipelines } from "../../pipeline";
import { useSources } from "./useSources";

export const useSourcesWithPipelines = ({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) => {
  const sources = useSources({ accessToken });
  const pipelines = usePipelines({ enable: true, accessToken });
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
      enabled: sources.isSuccess ? (pipelines.isSuccess ? true : false) : false,
      retry: 3,
    }
  );
};
