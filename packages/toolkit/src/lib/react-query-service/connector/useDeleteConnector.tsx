import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteConnectorMutation,
  getConnectorQuery,
  type ConnectorsWatchState,
  type ConnectorWithDefinition,
  type ConnectorWithPipelines,
} from "../../vdp-sdk";
import { removeObjKey } from "../../utility";
import { Nullable } from "../../type";

export const useDeleteConnector = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      accessToken,
      connectorName,
    }: {
      accessToken: Nullable<string>;
      connectorName: string;
    }) => {
      const connector = await getConnectorQuery({
        connectorName,
        accessToken,
      });
      await deleteConnectorMutation({ connectorName, accessToken });
      return Promise.resolve(connector);
    },
    {
      onSuccess: (connector) => {
        queryClient.removeQueries(["connectors", connector.name], {
          exact: true,
        });

        queryClient.setQueryData<ConnectorWithDefinition[]>(
          ["connectors", connector.connector_type],
          (old) => {
            return old ? old.filter((e) => e.name !== connector.name) : [];
          }
        );

        // Deal with connectors with pipelines cache
        queryClient.setQueryData<ConnectorWithPipelines[]>(
          ["connectors", connector.connector_type, "with-pipelines"],
          (old) => (old ? old.filter((e) => e.name !== connector.name) : [])
        );

        queryClient.removeQueries(
          ["connectors", connector.name, "with-pipelines"],
          {
            exact: true,
          }
        );

        // Process watch state
        queryClient.removeQueries(["connectors", connector.name, "watch"], {
          exact: true,
        });

        queryClient.setQueryData<ConnectorsWatchState>(
          ["connectors", connector.connector_type, "watch"],
          (old) => {
            return old ? removeObjKey(old, connector.name) : {};
          }
        );
      },
    }
  );
};
