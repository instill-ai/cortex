import { listPipelinesQuery, Pipeline } from "../../vdp-sdk";
import { useQuery } from "@tanstack/react-query";
import { constructPipelineRecipeWithDefinition } from "../helper";
import { Nullable } from "../../type";

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
        pageSize: 50,
        nextPageToken: null,
        accessToken,
      });

      const pipelines: Pipeline[] = [];

      for (const pipeline of pipelinesWithRawRecipe) {
        const recipe = await constructPipelineRecipeWithDefinition(
          pipeline.recipe
        );
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
