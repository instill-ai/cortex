import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { usePipelines } from "../pipeline";
import { useModel } from "./useModel";
import { ModelWithPipelines } from "../../vdp-sdk";
import { getComponentFromPipelineRecipe } from "../../utility";

export function useModelWithPipelines({
  modelName,
  accessToken,
  enabled,
  retry,
}: {
  modelName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) {
  const pipelines = usePipelines({ enabled, accessToken, retry });
  const model = useModel({ modelName, accessToken, enabled, retry });

  let enableQuery = false;

  if (modelName && pipelines.isSuccess && model.isSuccess && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["models", modelName, "with-pipelines"],
    async () => {
      if (!modelName) {
        return Promise.reject(new Error("invalid model name"));
      }

      if (!model.data) {
        return Promise.reject(new Error("invalid model data"));
      }

      if (!pipelines.data) {
        return Promise.reject(new Error("invalid pipeline data"));
      }

      const targetPipelines = pipelines.data.filter((e) => {
        const models = getComponentFromPipelineRecipe({
          recipe: e.recipe,
          componentName: "model",
        });

        return models?.some((e) => e.resource_detail.id === model.data.id);
      });

      const modelWithPipelines: ModelWithPipelines = {
        ...model.data,
        pipelines: targetPipelines,
      };

      return modelWithPipelines;
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
}
