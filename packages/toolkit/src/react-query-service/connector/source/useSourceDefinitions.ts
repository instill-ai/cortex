import { useQuery } from "@tanstack/react-query";
import { listSourceDefinitionsQuery } from "../../../vdp-sdk";

export const useSourceDefinitions = () => {
  return useQuery(
    ["sources", "definition"],
    async () => {
      const sourceDefinitions = await listSourceDefinitionsQuery();
      return Promise.resolve(sourceDefinitions);
    },
    {
      retry: 3,
    }
  );
};
