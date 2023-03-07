import { useQuery } from "@tanstack/react-query";
import { listModelDefinitionsQuery } from "../../vdp-sdk";

export const useModelDefinitions = () => {
  return useQuery(
    ["models", "definition"],
    async () => {
      const definitions = await listModelDefinitionsQuery();
      return Promise.resolve(definitions);
    },
    {
      retry: 3,
    }
  );
};
