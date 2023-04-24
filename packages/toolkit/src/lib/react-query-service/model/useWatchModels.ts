import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { watchModel, type ModelsWatchState } from "../../vdp-sdk";

export function useWatchModels({
  modelNames,
  accessToken,
  enabled,
  retry,
}: {
  modelNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) {
  let enableQuery = false;

  if (modelNames && enabled && modelNames.length > 0) {
    enableQuery = true;
  }

  return useQuery(
    ["models", "watch"],
    async () => {
      if (!modelNames || modelNames.length === 0) {
        return Promise.reject(new Error("Model names not provided"));
      }

      let watches: ModelsWatchState = {};

      for (const modelName of modelNames) {
        const watch = await watchModel({
          modelName,
          accessToken,
        });
        watches[modelName] = watch;
      }

      return Promise.resolve(watches);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
}
