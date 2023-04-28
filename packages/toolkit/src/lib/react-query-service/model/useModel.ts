import { useQuery } from "@tanstack/react-query";
import { getModelQuery } from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useModel = ({
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
}) => {
  let enableQuery = false;

  if (modelName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["models", modelName],
    async () => {
      if (!modelName) {
        return Promise.reject(new Error("Model name not provided"));
      }

      const model = await getModelQuery({ modelName, accessToken });

      return Promise.resolve(model);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
