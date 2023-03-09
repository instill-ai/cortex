import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { listModelInstancesQuery } from "../../vdp-sdk";
import { useModels } from "./useModels";

export const useModelsInstances = ({
  enable,
  accessToken,
}: {
  enable: boolean;
  accessToken: Nullable<string>;
}) => {
  const models = useModels({ accessToken });
  return useQuery(
    ["models", "all", "modelInstances"],
    async () => {
      const modelInstances = [];
      if (!models.data) {
        return Promise.reject(new Error("Model data not provided"));
      }

      for (const model of models.data) {
        const instances = await listModelInstancesQuery({
          modelName: model.name,
          pageSize: 10,
          nextPageToken: null,
          accessToken,
        });
        modelInstances.push(...instances);
      }

      return Promise.resolve(modelInstances);
    },
    {
      enabled: enable ? (models.isSuccess ? true : false) : false,
      retry: 3,
    }
  );
};
