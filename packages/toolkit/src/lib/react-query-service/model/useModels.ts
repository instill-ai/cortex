import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { env } from "../../utility";
import { listModelsQuery } from "../../vdp-sdk";

export const useModels = ({
  accessToken,
  enable,
}: {
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  return useQuery(
    ["models"],
    async () => {
      const models = await listModelsQuery({
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
      });
      return Promise.resolve(models);
    },
    {
      retry: 3,
      enabled: enable,
    }
  );
};
