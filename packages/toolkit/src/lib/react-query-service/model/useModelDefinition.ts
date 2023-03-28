import { useQuery } from "@tanstack/react-query";
import { getModelDefinitionQuery } from "../../vdp-sdk";
import { Nullable } from "../../type";

export const useModelDefinition = ({
  modelDefinitionName,
  accessToken,
  enable,
}: {
  modelDefinitionName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  let enableQuery = false;

  if (modelDefinitionName && enable) {
    enableQuery = true;
  }

  return useQuery(
    ["models", "definition", modelDefinitionName],
    async () => {
      if (!modelDefinitionName) {
        return Promise.reject(new Error("Model definition name not found"));
      }

      const definition = await getModelDefinitionQuery({
        modelDefinitionName,
        accessToken,
      });

      return Promise.resolve(definition);
    },
    { enabled: enableQuery, retry: 3 }
  );
};
