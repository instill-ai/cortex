import { useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { fetchSources } from "./useSources";

export async function prefetchSources(
  accessToken: Nullable<string>,
  staleTime?: number
) {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery(
    ["sources"],
    async () => {
      const sources = await fetchSources(accessToken);
      return Promise.resolve(sources);
    },
    { staleTime }
  );
}
