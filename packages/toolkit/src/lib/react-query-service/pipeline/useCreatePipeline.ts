import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  createPipelineMutation,
  CreatePipelinePayload,
  Pipeline,
} from "../../vdp-sdk";
import { constructPipelineRecipeWithDefinition } from "../helper";

export const useCreatePipeline = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: CreatePipelinePayload;
      accessToken: Nullable<string>;
    }) => {
      const res = await createPipelineMutation({ payload, accessToken });
      return Promise.resolve({ newPipeline: res, accessToken });
    },
    {
      onSuccess: async ({ newPipeline, accessToken }) => {
        const recipe = await constructPipelineRecipeWithDefinition({
          rawRecipe: newPipeline.recipe,
          accessToken,
        });

        const pipeline: Pipeline = {
          ...newPipeline,
          recipe: recipe,
        };

        queryClient.setQueryData<Pipeline>(
          ["pipelines", newPipeline.id],
          pipeline
        );

        queryClient.setQueryData<Pipeline[]>(["pipelines"], (old) =>
          old
            ? [...old.filter((e) => e.id !== newPipeline.id), pipeline]
            : [pipeline]
        );
      },
    }
  );
};
