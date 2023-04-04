import { getModelCardQuery } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { useQuery } from "@tanstack/react-query";

export const useModelCard = ({
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
    ["models", modelName, "readme"],
    async () => {
      if (!modelName) {
        return Promise.reject(new Error("Model instance name not provided"));
      }

      const modelInstanceReadme = await getModelCardQuery({
        modelName,
        accessToken,
      });

      return Promise.resolve(window.atob(modelInstanceReadme.content));
    },
    {
      enabled: enableQuery,
      retry: 3,
    }
  );
};
