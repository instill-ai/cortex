import { useQuery } from "@tanstack/react-query";
import { listModelInstancesQuery } from "../../vdp-sdk";
import { Nullable } from "../../type";

export const useModelInstances = ({
  modelName,
  accessToken,
}: {
  modelName: Nullable<string>;
  accessToken: Nullable<string>;
}) => {
  return useQuery(
    ["models", modelName, "modelInstances"],
    async () => {
      if (!modelName) {
        return Promise.reject(new Error("Model name not provided"));
      }

      const modelInstances = await listModelInstancesQuery({
        modelName,
        pageSize: 10,
        nextPageToken: null,
        accessToken,
      });

      return Promise.resolve(modelInstances);
    },
    {
      enabled: modelName ? true : false,
      retry: 3,
    }
  );
};
