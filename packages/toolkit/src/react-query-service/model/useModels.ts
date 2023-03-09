import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { listModelsQuery } from "../../vdp-sdk";

export const useModels = ({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) => {
  return useQuery(
    ["models"],
    async () => {
      const models = await listModelsQuery({
        pageSize: 10,
        nextPageToken: null,
        accessToken,
      });
      return Promise.resolve(models);
    },
    {
      retry: 3,
    }
  );
};
