import { useQuery } from "@tanstack/react-query";
import { listModelInstancesQuery } from "../../vdp-sdk";
import { Nullable } from "../../type";

export const useModelInstances = (modelName: Nullable<string>) => {
  return useQuery(
    ["models", modelName, "modelInstances"],
    async () => {
      if (!modelName) {
        return Promise.reject(new Error("Model name not provided"));
      }

      const modelInstances = await listModelInstancesQuery(modelName);
      return Promise.resolve(modelInstances);
    },
    {
      enabled: modelName ? true : false,
      retry: 3,
    }
  );
};
