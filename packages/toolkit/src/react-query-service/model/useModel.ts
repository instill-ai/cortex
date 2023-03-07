import { useQuery } from "@tanstack/react-query";
import { getModelQuery } from "../../vdp-sdk";
import { Nullable } from "../../type";

export const useModel = (modelName: Nullable<string>) => {
  return useQuery(
    ["models", modelName],
    async () => {
      if (!modelName) {
        return Promise.reject(new Error("Model name not provided"));
      }

      const model = await getModelQuery(modelName);

      return Promise.resolve(model);
    },
    {
      enabled: modelName ? true : false,
      retry: 3,
    }
  );
};
