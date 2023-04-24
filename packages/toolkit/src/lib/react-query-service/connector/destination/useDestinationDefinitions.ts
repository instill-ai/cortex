import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";

import { env } from "../../../utility";
import { listDestinationDefinitionsQuery } from "../../../vdp-sdk";

export const useDestinationDefinitions = ({
  accessToken,
  enabled,
  retry,
}: {
  accessToken: Nullable<string>;
  enabled: boolean;
  retry?: number;
}) => {
  if (env("NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH") && !accessToken) {
    throw new Error(
      "You had set NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH=true but didn't provide necessary access token"
    );
  }

  return useQuery(
    ["destinations", "definition"],
    async () => {
      const destinationDefinition = await listDestinationDefinitionsQuery({
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
      });
      return Promise.resolve(destinationDefinition);
    },
    {
      enabled,
      retry: retry ? retry : 3,
    }
  );
};
