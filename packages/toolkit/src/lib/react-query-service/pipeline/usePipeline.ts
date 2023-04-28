import { useQuery } from "@tanstack/react-query";
import { getPipelineQuery, type Pipeline } from "../../vdp-sdk";
import { constructPipelineRecipeWithDefinition } from "../helper";
import type { Nullable } from "../../type";

export const usePipeline = ({
  pipelineName,
  accessToken,
  enabled,
  retry,
}: {
  pipelineName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  let enableQuery = false;

  if (pipelineName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["pipelines", pipelineName],
    async () => {
      if (!pipelineName) {
        return Promise.reject(new Error("invalid pipeline name"));
      }

      const rawPipeline = await getPipelineQuery({ pipelineName, accessToken });
      const recipe = await constructPipelineRecipeWithDefinition({
        rawRecipe: rawPipeline.recipe,
        accessToken,
      });

      const pipeline: Pipeline = {
        ...rawPipeline,
        recipe: recipe,
      };

      return Promise.resolve(pipeline);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
