import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  connectConnectorResourceAction,
  getConnectorResourceQuery,
  watchConnectorResource,
  type ConnectorResourceWatchState,
  type ConnectorResourceWithDefinition,
  type ConnectorResourceWithPipelines,
  type Pipeline,
  type ConnectorResourcesWatchState,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";
import { getComponentsFromPipelineRecipe, removeObjKey } from "../../utility";

export const useConnectConnectorResource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      connectorResourceName,
      accessToken,
    }: {
      connectorResourceName: string;
      accessToken: Nullable<string>;
    }) => {
      const connectorResource = await connectConnectorResourceAction({
        connectorResourceName,
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
            connectorResourceType: connectorResource.connector_type,
          });

          return components.some(
            (e) => e.resource_detail.id === connectorResource.id
          );
        });

        const connectorResourceWithPipelines: ConnectorResourceWithPipelines = {
          ...connectorResourceWithDefinition,
          pipelines: targetPipelines ? targetPipelines : [],
        };

        queryClient.setQueryData<ConnectorResourceWithPipelines>(
          ["connector-resources", connectorResource.name, "with-pipelines"],
          connectorResourceWithPipelines
        );

        queryClient.setQueryData<ConnectorResourceWithPipelines[]>(
          [
            "connector-resources",
            connectorResource.connector_type,
            "with-pipelines",
          ],
          (old) =>
            old
              ? [
                  ...old.filter((e) => e.id !== connectorResource.id),
                  connectorResourceWithPipelines,
                ]
              : [connectorResourceWithPipelines]
        );

        queryClient.setQueryData<ConnectorResourceWithDefinition[]>(
          ["connector-resources", connectorResource.connector_type],
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
          ["connectors", connectorResource.name, "watch"],
          watch
        );

        queryClient.setQueryData<ConnectorResourcesWatchState>(
          ["connectors", connectorResource.connector_type, "watch"],
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
