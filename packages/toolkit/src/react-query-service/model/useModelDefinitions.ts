import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { env } from "../../utility";
import { listModelDefinitionsQuery } from "../../vdp-sdk";

export const useModelDefinitions = ({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) => {
  return useQuery(
    ["models", "definition"],
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
    }
  );
};
