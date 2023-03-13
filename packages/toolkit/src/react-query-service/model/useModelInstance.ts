import { getModelInstanceQuery } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { useQuery } from "@tanstack/react-query";

export const useModelInstance = ({
  modelInstanceName,
  accessToken,
}: {
  modelInstanceName: Nullable<string>;
  accessToken: Nullable<string>;
}) => {
  return useQuery(
    [
      "models",
      modelInstanceName?.split("/")[1],
      "modelInstances",
      modelInstanceName,
    ],
    async () => {
      if (!modelInstanceName) {
        return Promise.reject(new Error("Model instance name not provided"));
      }

      const modelInstances = await getModelInstanceQuery({
        modelInstanceName,
        accessToken,
      });

      return Promise.resolve(modelInstances);
    },
    {
      enabled: modelInstanceName ? true : false,
      retry: 3,
    }
  );
};