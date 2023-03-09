import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { listSourceDefinitionsQuery } from "../../../vdp-sdk";

export const useSourceDefinitions = ({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) => {
  return useQuery(
    ["sources", "definition"],
    async () => {
      const sourceDefinitions = await listSourceDefinitionsQuery({
        pageSize: 10,
        nextPageToken: null,
        accessToken,
      });
      return Promise.resolve(sourceDefinitions);
    },
    {
      retry: 3,
    }
  );
};
