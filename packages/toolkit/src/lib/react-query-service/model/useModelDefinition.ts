import { useQuery } from "@tanstack/react-query";
import { getModelDefinitionQuery } from "../../vdp-sdk";
import { Nullable } from "../../type";

export const useModelDefinition = ({
  modelDefinitionName,
  accessToken,
}: {
  modelDefinitionName: Nullable<string>;
  accessToken: Nullable<string>;
}) => {
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
    { enabled: modelDefinitionName ? true : false, retry: 3 }
  );
};
