import { useQuery } from "@tanstack/react-query";
import { listModelInstancesQuery, ModelWithInstance } from "../../vdp-sdk";
import { determineModelState, env } from "../../utility";
import { useModels } from "./useModels";
import { Nullable } from "../../type";

export const useModelsWithInstances = ({
  accessToken,
  enable,
}: {
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  const models = useModels({ accessToken, enable });

  let enableQuery = false;

  if (models.isSuccess && enable) {
    enableQuery = true;
  }

  return useQuery(
    ["models", "with-instances"],
    async () => {
      if (!models.data) {
        return Promise.reject(new Error("Models data not provided"));
      }

      const modelsWithInstances: ModelWithInstance[] = [];

      for (const model of models.data) {
        const modelInstances = await listModelInstancesQuery({
          modelName: model.name,
          pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
          nextPageToken: null,
          accessToken,
        });
        modelsWithInstances.push({
          ...model,
          instances: modelInstances,
          state: determineModelState(modelInstances),
        });
      }

      return Promise.resolve(modelsWithInstances);
    },
    {
      enabled: enableQuery,
      retry: 3,
    }
  );
};
