import { useQuery } from "@tanstack/react-query";
import { getPipelineQuery, Pipeline } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { constructPipelineRecipeWithDefinition } from "../helper";

export const usePipeline = ({
  pipelineName,
  accessToken,
  enable,
}: {
  pipelineName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  let enableQuery = false;

  if (pipelineName && enable) {
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
      retry: 3,
    }
  );
};
