import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { env } from "../../../utility";
import { listSourceDefinitionsQuery } from "../../../vdp-sdk";

export const useSourceDefinitions = ({
  accessToken,
  enable,
}: {
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  return useQuery(
    ["sources", "definition"],
    async () => {
      const sourceDefinitions = await listSourceDefinitionsQuery({
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
      });
      return Promise.resolve(sourceDefinitions);
    },
    {
      retry: 3,
      enabled: enable,
    }
  );
};
