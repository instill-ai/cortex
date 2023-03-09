import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { activatePipelineMutation, Pipeline } from "../../vdp-sdk";
import { constructPipelineRecipeWithDefinition } from "../helper";

export const useActivatePipeline = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      pipelineName,
      accessToken,
    }: {
      pipelineName: string;
      accessToken: Nullable<string>;
    }) => {
      const rawPipeline = await activatePipelineMutation({
        pipelineName,
        accessToken,
      });
      const recipe = await constructPipelineRecipeWithDefinition(
        rawPipeline.recipe
      );

      const pipeline: Pipeline = {
        ...rawPipeline,
        recipe: recipe,
      };

      return Promise.resolve(pipeline);
    },
    {
      onSuccess: (newPipeline) => {
        queryClient.setQueryData<Pipeline>(
          ["pipelines", newPipeline.id],
          newPipeline
        );
        queryClient.setQueryData<Pipeline[]>(["pipelines"], (old) => {
          if (!old) {
            return [newPipeline];
          }

          return [...old.filter((e) => e.id !== newPipeline.id), newPipeline];
        });
      },
    }
  );
};
