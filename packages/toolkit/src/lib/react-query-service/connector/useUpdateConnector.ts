import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeObjKey } from "../../utility";
import {
  updateConnectorMutation,
  getConnectorDefinitionQuery,
  ConnectorWithDefinition,
  watchConnector,
  type ConnectorsWatchState,
  type ConnectorWatchState,
} from "../../vdp-sdk";
import { UpdateConnectorPayload } from "../../vdp-sdk";
import { Nullable } from "../../type";

export const useUpdateConnector = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      accessToken,
      payload,
    }: {
      accessToken: Nullable<string>;
      payload: UpdateConnectorPayload;
    }) => {
      const connector = await updateConnectorMutation({
        payload,
        accessToken,
      });
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

        // Deal with destinations with pipelines cache
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
