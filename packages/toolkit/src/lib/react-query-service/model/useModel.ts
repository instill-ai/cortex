import { useQuery } from "@tanstack/react-query";
import { getModelQuery } from "../../vdp-sdk";
import { Nullable } from "../../type";

export const useModel = ({
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
      retry: 3,
    }
  );
};
