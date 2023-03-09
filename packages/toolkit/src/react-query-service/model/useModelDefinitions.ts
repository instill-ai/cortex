import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
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
        pageSize: 10,
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
