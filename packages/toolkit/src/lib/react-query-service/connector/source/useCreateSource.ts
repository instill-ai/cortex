import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeObjKey } from "../../../utility";
import {
  createSourceMutation,
  getSourceDefinitionQuery,
  watchSource,
  type ConnectorsWatchState,
  type ConnectorWatchState,
  type CreateSourcePayload,
  type SourceWithDefinition,
} from "../../../vdp-sdk";
import type { Nullable } from "../../../type";

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
          old
            ? [
                ...old.filter((e) => e.name !== newSource.name),
                newSourceWithDefinition,
              ]
            : [newSourceWithDefinition]
        );

        // Invalidate destination with pipeline cache
        queryClient.invalidateQueries(["sources", "with-pipelines"]);

        // Process watch state
        const watch = await watchSource({
          sourceName: newSource.name,
          accessToken,
        });

        queryClient.setQueryData<ConnectorWatchState>(
          ["sources", newSource.name, "watch"],
          watch
        );

        queryClient.setQueryData<ConnectorsWatchState>(
          ["sources", "watch"],
          (old) =>
            old
              ? {
                  ...removeObjKey(old, newSource.name),
                  [newSource.name]: watch,
                }
              : { [newSource.name]: watch }
        );
      },
    }
  );
};
