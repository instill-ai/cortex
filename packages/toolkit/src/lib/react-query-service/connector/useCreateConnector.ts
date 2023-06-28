import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeObjKey } from "../../utility";
import type { Nullable } from "../../type";
import {
  ConnectorWithDefinition,
  CreateConnectorPayload,
  createConnectorMutation,
  getConnectorDefinitionQuery,
  watchConnector,
  type ConnectorWatchState,
  ConnectorsWatchState,
} from "../../vdp-sdk";

export const useCreateConnector = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: CreateConnectorPayload;
      accessToken: Nullable<string>;
    }) => {
      const connector = await createConnectorMutation({ payload, accessToken });
      return Promise.resolve({ connector, accessToken });
    },
    {
      onSuccess: async ({ connector, accessToken }) => {
        const connectorDefinition = await getConnectorDefinitionQuery({
          connectorDefinitionName: connector.connector_definition,
          accessToken,
        });

        const connectorWithDefinition: ConnectorWithDefinition = {
          ...connector,
          connector_definition: connectorDefinition,
        };

        queryClient.setQueryData<ConnectorWithDefinition>(
          ["connector", connector.name],
          connectorWithDefinition
        );

        queryClient.setQueryData<ConnectorWithDefinition[]>(
          ["connectors", connector.connector_type],
          (old) =>
            old
              ? [
                  ...old.filter((e) => e.name !== connector.name),
                  connectorWithDefinition,
                ]
              : [connectorWithDefinition]
        );

        // Invalidate destination with pipeline cache
        queryClient.invalidateQueries(["connectors", "with-pipelines"]);
        queryClient.invalidateQueries([
          "connectors",
          connector.name,
          "with-pipelines",
        ]);

        // Process watch state
        const watch = await watchConnector({
          connectorName: connectorWithDefinition.name,
          accessToken,
        });

        queryClient.setQueryData<ConnectorWatchState>(
          ["connectors", connectorWithDefinition.name, "watch"],
          watch
        );

        queryClient.setQueryData<ConnectorsWatchState>(
          ["connectors", connector.connector_type, "watch"],
          (old) =>
            old
              ? {
                  ...removeObjKey(old, connectorWithDefinition.name),
                  [connectorWithDefinition.name]: watch,
                }
              : { [connectorWithDefinition.name]: watch }
        );
      },
    }
  );
};
