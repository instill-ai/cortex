import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteConnectorResourceMutation,
  getConnectorResourceQuery,
  type ConnectorResourcesWatchState,
  type ConnectorResourceWithDefinition,
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
          ["connector-resources", connectorResource.type],
          (old) => {
            return old
              ? old.filter((e) => e.name !== connectorResource.name)
              : [];
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
          ["connector-resources", connectorResource.type, "watch"],
          (old) => {
            return old ? removeObjKey(old, connectorResource.name) : {};
          }
        );
      },
    }
  );
};
