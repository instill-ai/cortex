import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { env } from "../../utility";
import { listModelDefinitionsQuery } from "../../vdp-sdk";

export const useModelDefinitions = ({
  accessToken,
  enable,
}: {
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  return useQuery(
    ["model-definitions"],
    async () => {
      const definitions = await listModelDefinitionsQuery({
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
      });
      return Promise.resolve(definitions);
    },
    {
      retry: 3,
      enabled: enable,
    }
  );
};
