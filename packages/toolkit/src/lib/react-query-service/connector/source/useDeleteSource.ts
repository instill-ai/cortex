import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { deleteSourceMutation, SourceWithDefinition } from "../../../vdp-sdk";

export const useDeleteSource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      sourceName,
      accessToken,
    }: {
      sourceName: string;
      accessToken: Nullable<string>;
    }) => {
      await deleteSourceMutation({ sourceName, accessToken });
      return sourceName;
    },
    {
      onSuccess: (sourceName) => {
        const sourceId = sourceName.split("/")[1];

        queryClient.removeQueries(["sources", sourceId], { exact: true });

        const sources = queryClient.getQueryData<SourceWithDefinition[]>([
          "sources",
        ]);

        if (sources) {
          queryClient.setQueryData<SourceWithDefinition[]>(
            ["sources"],
            sources.filter((e) => e.name !== sourceName)
          );
        }
      },
    }
  );
};
