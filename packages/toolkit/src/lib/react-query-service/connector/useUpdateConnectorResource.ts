import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getComponentsFromPipelineRecipe, removeObjKey } from "../../utility";
import {
  updateConnectorResourceMutation,
  watchConnectorResource,
  getConnectorResourceQuery,
  type Pipeline,
  type ConnectorResourceWithDefinition,
  type ConnectorResourceWithPipelines,
  type ConnectorResourcesWatchState,
  type ConnectorResourceWatchState,
  type UpdateConnectorResourcePayload,
} from "../../vdp-sdk";
import { Nullable } from "../../type";

export const useUpdateConnectorResource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      accessToken,
      payload,
    }: {
      accessToken: Nullable<string>;
      payload: UpdateConnectorResourcePayload;
    }) => {
      const connectorResource = await updateConnectorResourceMutation({
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
            connectorType: connectorResource.connector_type,
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
          ["connector-resources", connectorResource.name, "watch"],
          watch
        );

        queryClient.setQueryData<ConnectorResourcesWatchState>(
          ["connector-resources", connectorResource.connector_type, "watch"],
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
