import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getComponentsFromPipelineRecipe, removeObjKey } from "../../utility";
import type { Nullable } from "../../type";
import {
  createConnectorResourceMutation,
  watchConnectorResource,
  getConnectorResourceQuery,
  type Pipeline,
  type ConnectorResourcesWatchState,
  type ConnectorResourceWatchState,
  type CreateConnectorResourcePayload,
  type ConnectorResourceWithDefinition,
} from "../../vdp-sdk";

export const useCreateConnectorResource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: CreateConnectorResourcePayload;
      accessToken: Nullable<string>;
    }) => {
      const connectorResource = await createConnectorResourceMutation({
        payload,
        accessToken,
      });
      return Promise.resolve({ connectorResource, accessToken });
    },
    {
      onSuccess: async ({ connectorResource, accessToken }) => {
        const pipelines = queryClient.getQueryData<Pipeline[]>(["pipelines"]);

        const connectorResourceWithDefinition = await getConnectorResourceQuery(
          {
            connectorResourceName: connectorResource.name,
            accessToken,
          }
        );

        queryClient.setQueryData<ConnectorResourceWithDefinition>(
          ["connector-resources", connectorResource.name],
          connectorResourceWithDefinition
        );

        const targetPipelines = pipelines?.filter((e) => {
          const components = getComponentsFromPipelineRecipe({
            recipe: e.recipe,
            connectorResourceType: connectorResource.type,
          });

          return components.some((e) => e.resource.id === connectorResource.id);
        });

        queryClient.setQueryData<ConnectorResourceWithDefinition[]>(
          ["connector-resources", connectorResource.type],
          (old) =>
            old
              ? [
                  ...old.filter((e) => e.id !== connectorResource.id),
                  connectorResourceWithDefinition,
                ]
              : [connectorResourceWithDefinition]
        );

        // Process watch state
        const watch = await watchConnectorResource({
          connectorResourceName: connectorResource.name,
          accessToken,
        });

        queryClient.setQueryData<ConnectorResourceWatchState>(
          ["connector-resources", connectorResource.name, "watch"],
          watch
        );

        queryClient.setQueryData<ConnectorResourcesWatchState>(
          ["connector-resources", connectorResource.type, "watch"],
          (old) =>
            old
              ? {
                  ...removeObjKey(old, connectorResource.name),
                  [connectorResource.name]: watch,
                }
              : { [connectorResource.name]: watch }
        );
      },
    }
  );
};
