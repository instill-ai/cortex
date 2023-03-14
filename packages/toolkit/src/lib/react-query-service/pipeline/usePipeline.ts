import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPipelineQuery, Pipeline } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { constructPipelineRecipeWithDefinition } from "../helper";

export const usePipeline = ({
  pipelineName,
  accessToken,
}: {
  pipelineName: Nullable<string>;
  accessToken: Nullable<string>;
}) => {
  const queryClient = useQueryClient();
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
      enabled: pipelineName ? true : false,
      initialData: queryClient
        .getQueryData<Pipeline[]>(["pipelines"])
        ?.find((e) => e.name === pipelineName),
      retry: 3,
    }
  );
};
