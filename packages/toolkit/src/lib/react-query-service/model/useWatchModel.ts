import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { watchModel } from "../../vdp-sdk";

export function useWatchModel({
  modelName,
  accessToken,
  enabled,
  retry,
}: {
  modelName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) {
  let enableQuery = false;

  if (modelName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["models", modelName, "watch"],
    async () => {
      if (!modelName) {
        return Promise.reject(new Error("Model name not provided"));
      }

      const watch = await watchModel({
        modelName,
        accessToken,
      });

      return Promise.resolve(watch);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
}
