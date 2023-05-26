import { QueryClient } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { fetchDestinations } from "./useDestinations";

export async function prefetchDestinations(
  queryClient: QueryClient,
  accessToken: Nullable<string>,
  staleTime?: number
) {
  await queryClient.prefetchQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const destinations = await fetchDestinations(accessToken);
      return Promise.resolve(destinations);
    },
    staleTime,
  });
}
