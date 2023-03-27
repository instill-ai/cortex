import { useQuery } from "@tanstack/react-query";
import {
  listModelInstancesQuery,
  Model,
  ModelWithInstance,
} from "../../vdp-sdk";
import { Nullable } from "../../type";
import { determineModelState, env } from "../../utility";

export const useModelWithInstances = ({
  model,
  accessToken,
  enable,
}: {
  model: Nullable<Model>;
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  let enableQuery = false;

  if (model && enable) {
    enableQuery = true;
  }

  return useQuery(
    ["models", "with-instances", model?.name],
    async () => {
      if (!model) {
        return Promise.reject(new Error("Model data not provided"));
      }

      const modelInstances = await listModelInstancesQuery({
        modelName: model.name,
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
      });

      const modelWithInstances: ModelWithInstance = {
        ...model,
        instances: modelInstances,
        state: determineModelState(modelInstances),
      };

      return Promise.resolve(modelWithInstances);
    },
    { enabled: enableQuery, retry: 3 }
  );
};
