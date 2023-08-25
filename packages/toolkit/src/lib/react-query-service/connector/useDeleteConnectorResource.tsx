import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteConnectorResourceMutation,
  getConnectorResourceQuery,
  type ConnectorResourcesWatchState,
  type ConnectorResourceWithDefinition,
  type ConnectorResourceWithPipelines,
} from "../../vdp-sdk";
import { removeObjKey } from "../../utility";
import { Nullable } from "../../type";

export const useDeleteConnectorResource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      accessToken,
      connectorResourceName,
    }: {
      accessToken: Nullable<string>;
      connectorResourceName: string;
    }) => {
      const connectorResource = await getConnectorResourceQuery({
        connectorResourceName,
        accessToken,
      });
      await deleteConnectorResourceMutation({
        connectorResourceName,
        accessToken,
      });
      return Promise.resolve(connectorResource);
    },
    {
      onSuccess: (connectorResource) => {
        queryClient.removeQueries(
          ["connector-resources", connectorResource.name],
          {
            exact: true,
          }
        );

        queryClient.setQueryData<ConnectorResourceWithDefinition[]>(
          ["connector-resources", connectorResource.connector_type],
          (old) => {
            return old
              ? old.filter((e) => e.name !== connectorResource.name)
              : [];
          }
        );

        // Deal with connectors with pipelines cache
        queryClient.setQueryData<ConnectorResourceWithPipelines[]>(
          [
            "connector-resources",
            connectorResource.connector_type,
            "with-pipelines",
          ],
          (old) =>
            old ? old.filter((e) => e.name !== connectorResource.name) : []
        );

        queryClient.removeQueries(
          ["connector-resources", connectorResource.name, "with-pipelines"],
          {
            exact: true,
          }
        );

        // Process watch state
        queryClient.removeQueries(
          ["connector-resources", connectorResource.name, "watch"],
          {
            exact: true,
          }
        );

        queryClient.setQueryData<ConnectorResourcesWatchState>(
          ["connector-resources", connectorResource.connector_type, "watch"],
          (old) => {
            return old ? removeObjKey(old, connectorResource.name) : {};
          }
        );
      },
    }
  );
};
