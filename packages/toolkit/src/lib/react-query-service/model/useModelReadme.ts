import { useQuery } from "@tanstack/react-query";
import { getModelReadmeQuery } from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useModelReadme = ({
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
    ["models", modelName, "readme"],
    async () => {
      if (!modelName) {
        return Promise.reject(new Error("Modelname not provided"));
      }

      const modelReadme = await getModelReadmeQuery({
        modelName,
        accessToken,
      });

      return Promise.resolve(window.atob(modelReadme.content));
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
