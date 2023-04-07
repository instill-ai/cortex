import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  WatchModelState,
  WatchModelsState,
  watchModelState,
} from "../../vdp-sdk";

export function useWatchModels({
  modelNames,
  accessToken,
  enable,
}: {
  modelNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enable: boolean;
}) {
  let enableQuery = false;

  if (modelNames && enable && modelNames.length > 0) {
    enableQuery = true;
  }

  return useQuery(
    ["models", "watch"],
    async () => {
      if (!modelNames || modelNames.length === 0) {
        return Promise.reject(new Error("Model name not provided"));
      }

      let watches: WatchModelsState = {};

      for (const modelName of modelNames) {
        const watch = await watchModelState({
          modelName,
          accessToken,
        });
        watches[modelName] = watch;
      }

      return Promise.resolve(watches);
    },
    {
      retry: 3,
      enabled: enableQuery,
    }
  );
}
