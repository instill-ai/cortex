import { useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { fetchPipelines } from "./usePipelines";

export async function prefetchPipelines(
  accessToken: Nullable<string>,
  staleTime?: number
) {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pipelines"],
    queryFn: async () => {
      const pipelines = await fetchPipelines(accessToken);
      return Promise.resolve(pipelines);
    },
    staleTime,
  });
}
