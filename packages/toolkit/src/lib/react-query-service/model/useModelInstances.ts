import { useQuery } from "@tanstack/react-query";
import { listModelInstancesQuery } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { env } from "../../utility";

export const useModelInstances = ({
  modelName,
  accessToken,
  enable,
}: {
  modelName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  let enableQuery = false;

  if (modelName && enable) {
    enableQuery = true;
  }

  return useQuery(
    ["models", modelName, "modelInstances"],
    async () => {
      if (!modelName) {
        return Promise.reject(new Error("Model name not provided"));
      }

      const modelInstances = await listModelInstancesQuery({
        modelName,
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
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
