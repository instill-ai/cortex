import { useQueryClient } from "@tanstack/react-query";
import { fetchModels } from "./useModels";
import { Nullable } from "../../type";

export async function prefetchModels(
  accessToken: Nullable<string>,
  staleTime?: number
) {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const models = await fetchModels(accessToken);
      return Promise.resolve(models);
    },
    staleTime,
  });
}
