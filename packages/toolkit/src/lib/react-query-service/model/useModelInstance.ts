import { getModelInstanceQuery } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { useQuery } from "@tanstack/react-query";

export const useModelInstance = ({
  modelInstanceName,
  accessToken,
  enable,
}: {
  modelInstanceName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  let enableQuery = false;

  if (modelInstanceName && enable) {
    enableQuery = true;
  }

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
      enabled: enableQuery,
      retry: 3,
    }
  );
};
