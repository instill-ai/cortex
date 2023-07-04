import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ConnectorWatchState,
  ConnectorWithDefinition,
  ConnectorWithPipelines,
  ConnectorsWatchState,
  Pipeline,
  connectConnectorAction,
  getConnectorQuery,
  watchConnector,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";
import { getComponentsFromPipelineRecipe, removeObjKey } from "../../utility";

export const useConnectConnector = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      connectorName,
      accessToken,
    }: {
      connectorName: string;
      accessToken: Nullable<string>;
    }) => {
      const connector = await connectConnectorAction({
        connectorName,
        accessToken,
      });

      return Promise.resolve({ connector, accessToken });
    },
    {
      onSuccess: async ({ connector, accessToken }) => {
        const pipelines = queryClient.getQueryData<Pipeline[]>(["pipelines"]);

        const connectorWithDefinition = await getConnectorQuery({
          connectorName: connector.name,
          accessToken,
        });

        queryClient.setQueryData<ConnectorWithDefinition>(
          ["connectors", connector.name],
          connectorWithDefinition
        );

        const targetPipelines = pipelines?.filter((e) => {
          const components = getComponentsFromPipelineRecipe({
            recipe: e.recipe,
            connectorType: connector.connector_type,
          });

          return components.some((e) => e.resource_detail.id === connector.id);
        });

        const connectorWithPipelines: ConnectorWithPipelines = {
          ...connectorWithDefinition,
          pipelines: targetPipelines ? targetPipelines : [],
        };

        queryClient.setQueryData<ConnectorWithPipelines>(
          ["connectors", connector.name, "with-pipelines"],
          connectorWithPipelines
        );

        queryClient.setQueryData<ConnectorWithPipelines[]>(
          ["connectors", connector.connector_type, "with-pipelines"],
          (old) =>
            old
              ? [
                  ...old.filter((e) => e.id !== connector.id),
                  connectorWithPipelines,
                ]
              : [connectorWithPipelines]
        );

        queryClient.setQueryData<ConnectorWithDefinition[]>(
          ["connectors", connector.connector_type],
          (old) =>
            old
              ? [
                  ...old.filter((e) => e.id !== connector.id),
                  connectorWithDefinition,
                ]
              : [connectorWithDefinition]
        );

        // Process watch state
        const watch = await watchConnector({
          connectorName: connector.name,
          accessToken,
        });

        queryClient.setQueryData<ConnectorWatchState>(
          ["connectors", connector.name, "watch"],
          watch
        );

        queryClient.setQueryData<ConnectorsWatchState>(
          ["connectors", connector.connector_type, "watch"],
          (old) =>
            old
              ? {
                  ...removeObjKey(old, connector.name),
                  [connector.name]: watch,
                }
              : { [connector.name]: watch }
        );
      },
    }
  );
};
