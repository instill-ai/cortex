import { listPipelinesQuery, Pipeline } from "../../vdp-sdk";
import { useQuery } from "@tanstack/react-query";
import { constructPipelineRecipeWithDefinition } from "../helper";
import { Nullable } from "../../type";
import { env } from "../../utility";

export const usePipelines = ({
  enabled,
  accessToken,
  retry,
}: {
  enabled: boolean;
  accessToken: Nullable<string>;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery(
    ["pipelines"],
    async () => {
      const pipelinesWithRawRecipe = await listPipelinesQuery({
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
      });

      const pipelines: Pipeline[] = [];

      for (const pipeline of pipelinesWithRawRecipe) {
        const recipe = await constructPipelineRecipeWithDefinition({
          rawRecipe: pipeline.recipe,
          accessToken,
        });
        pipelines.push({ ...pipeline, recipe: recipe });
      }

      return pipelines;
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
