import { useQuery } from "@tanstack/react-query";
import { listModelInstancesQuery, ModelWithInstance } from "../../vdp-sdk";
import { determineModelState } from "../../utility";
import { useModels } from "./useModels";
import { Nullable } from "../../type";

export const useModelsWithInstances = ({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) => {
  const models = useModels({ accessToken });
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
          pageSize: 10,
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
      enabled: models.isSuccess ? true : false,
      retry: 3,
    }
  );
};
