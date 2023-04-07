import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { watchModelState } from "../../vdp-sdk";

export function useWatchModel({
  modelName,
  accessToken,
  enable,
}: {
  modelName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) {
  let enableQuery = false;

  if (modelName && enable) {
    enableQuery = true;
  }

  return useQuery(
    ["models", modelName, "watch"],
    async () => {
      if (!modelName) {
        return Promise.reject(new Error("Model name not provided"));
      }

      const watch = await watchModelState({
        modelName,
        accessToken,
      });

      return Promise.resolve(watch);
    },
    {
      retry: 3,
      enabled: enableQuery,
    }
  );
}
