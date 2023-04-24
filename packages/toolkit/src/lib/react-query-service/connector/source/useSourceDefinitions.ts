import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { env } from "../../../utility";
import { listSourceDefinitionsQuery } from "../../../vdp-sdk";

export const useSourceDefinitions = ({
  accessToken,
  enabled,
  retry,
}: {
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
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
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
