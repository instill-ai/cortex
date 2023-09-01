import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ConnectorResourceWatchState,
  ConnectorResourceWithDefinition,
  ConnectorResourceWithPipelines,
  Pipeline,
  disconnectConnectorResourceAction,
  getConnectorResourceQuery,
  watchConnectorResource,
  ConnectorResourcesWatchState,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";
import { getComponentsFromPipelineRecipe, removeObjKey } from "../../utility";

export const useDisonnectConnectorResource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      connectorResourceName,
      accessToken,
    }: {
      connectorResourceName: string;
      accessToken: Nullable<string>;
    }) => {
      const connectorResource = await disconnectConnectorResourceAction({
        connectorResourceName: connectorResourceName,
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

        const connectorResourceWithPipelines: ConnectorResourceWithPipelines = {
          ...connectorResourceWithDefinition,
          pipelines: targetPipelines ? targetPipelines : [],
        };

        queryClient.setQueryData<ConnectorResourceWithPipelines>(
          ["connector-resources", connectorResource.name, "with-pipelines"],
          connectorResourceWithPipelines
        );

        queryClient.setQueryData<ConnectorResourceWithPipelines[]>(
          ["connector-resources", connectorResource.type, "with-pipelines"],
          (old) =>
            old
              ? [
                  ...old.filter((e) => e.id !== connectorResource.id),
                  connectorResourceWithPipelines,
                ]
              : [connectorResourceWithPipelines]
        );

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
