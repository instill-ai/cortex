import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";

import { env } from "../../../utility";
import { listDestinationDefinitionsQuery } from "../../../vdp-sdk";

export const useDestinationDefinitions = ({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) => {
  if (env("NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH") === "true" && !accessToken) {
    throw new Error(
      "You had set NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH=true but didn't provide necessary access token"
    );
  }

  return useQuery(
    ["destinations", "definition"],
    async () => {
      const destinationDefinition = await listDestinationDefinitionsQuery({
        pageSize: 10,
        nextPageToken: null,
        accessToken,
      });
      return Promise.resolve(destinationDefinition);
    },
    {
      retry: 3,
    }
  );
};
