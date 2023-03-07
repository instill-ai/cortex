import { useQuery } from "@tanstack/react-query";
import { listModelsQuery } from "../../vdp-sdk";

export const useModels = () => {
  return useQuery(
    ["models"],
    async () => {
      const models = await listModelsQuery();
      return Promise.resolve(models);
    },
    {
      retry: 3,
    }
  );
};
