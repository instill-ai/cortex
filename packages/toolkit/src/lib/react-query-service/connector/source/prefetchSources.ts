import { QueryClient } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { fetchSources } from "./useSources";

export async function prefetchSources(
  queryClient: QueryClient,
  accessToken: Nullable<string>,
  staleTime?: number
) {
  await queryClient.prefetchQuery({
    queryKey: ["sources"],
    queryFn: async () => {
      const sources = await fetchSources(accessToken);
      return Promise.resolve(sources);
    },
    staleTime,
  });
}
