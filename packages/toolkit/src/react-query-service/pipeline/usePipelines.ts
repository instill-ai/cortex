import { listPipelinesQuery, Pipeline } from "../../vdp-sdk";
import { useQuery } from "@tanstack/react-query";
import { constructPipelineRecipeWithDefinition } from "../helper";
import { Nullable } from "../../type";
import { env } from "../../utility";

export const usePipelines = ({
  enable,
  accessToken,
}: {
  enable: boolean;
  accessToken: Nullable<string>;
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
      enabled: enable ? true : false,
      retry: 3,
    }
  );
};
