import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import {
  createSourceMutation,
  CreateSourcePayload,
  getSourceDefinitionQuery,
  SourceWithDefinition,
} from "../../../vdp-sdk";

export const useCreateSource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: CreateSourcePayload;
      accessToken: Nullable<string>;
    }) => {
      const res = await createSourceMutation({ payload, accessToken });
      return Promise.resolve({ newSource: res, accessToken });
    },
    {
      onSuccess: async ({ newSource, accessToken }) => {
        const sourceDefinition = await getSourceDefinitionQuery({
          sourceDefinitionName: newSource.source_connector_definition,
          accessToken,
        });

        const newSourceWithDefinition: SourceWithDefinition = {
          ...newSource,
          source_connector_definition: sourceDefinition,
        };

        queryClient.setQueryData<SourceWithDefinition>(
          ["sources", newSource.id],
          newSourceWithDefinition
        );

        queryClient.setQueryData<SourceWithDefinition[]>(["sources"], (old) =>
          old ? [newSourceWithDefinition, ...old] : [newSourceWithDefinition]
        );

        queryClient.invalidateQueries(["sources", "watch"]);
      },
    }
  );
};
