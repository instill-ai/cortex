import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
  ConnectorResource,
  ConnectorResourceWatchState,
  ConnectorResourceWithDefinition,
  ConnectorResourcesWatchState,
  getConnectorDefinitionQuery,
  getUserConnectorResourceQuery,
  watchUserConnectorResource,
} from "../../vdp-sdk";
import { Nullable } from "../../type";
import { removeObjKey } from "../../utility";

export type OnSuccessAfterConnectResourceMutationProps =
  | OnSuccessAfterDeleteConnectResourceProps
  | OnSuccessAfterCreateConnectResourceProps
  | OnSuccessAfterUpdateConnectResourceProps
  | OnSuccessAfterConnectConnectResourceProps
  | OnSuccessAfterDisconnectConnectResourceProps;

export type OnSuccessAfterDeleteConnectResourceProps = {
  type: "delete";
  queryClient: QueryClient;
  connectorResourceName: string;
  accessToken: Nullable<string>;
};

export type OnSuccessAfterCreateConnectResourceProps = {
  type: "create";
  queryClient: QueryClient;
  connectorResource: ConnectorResource;
  accessToken: Nullable<string>;
};

export type OnSuccessAfterUpdateConnectResourceProps = {
  type: "update";
  queryClient: QueryClient;
  connectorResource: ConnectorResource;
  accessToken: Nullable<string>;
};

export type OnSuccessAfterConnectConnectResourceProps = {
  type: "connect";
  queryClient: QueryClient;
  connectorResource: ConnectorResource;
  accessToken: Nullable<string>;
};

export type OnSuccessAfterDisconnectConnectResourceProps = {
  type: "disconnect";
  queryClient: QueryClient;
  connectorResource: ConnectorResource;
  accessToken: Nullable<string>;
};

export async function onSuccessAfterConnectResourceMutation(
  props: OnSuccessAfterConnectResourceMutationProps
) {
  const { type, queryClient } = props;

  if (type === "delete") {
    const connectorResource = await getUserConnectorResourceQuery({
      connectorResourceName: props.connectorResourceName,
      accessToken: props.accessToken,
    });

    queryClient.removeQueries(["connector-resources", connectorResource.name], {
      exact: true,
    });

    queryClient.setQueryData<ConnectorResourceWithDefinition[]>(
      ["connector-resources", connectorResource.type],
      (old) => {
        return old ? old.filter((e) => e.name !== connectorResource.name) : [];
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
    return;
  }

  const { accessToken, connectorResource } = props;

  const connectorResourceDefinition = await getConnectorDefinitionQuery({
    connectorDefinitionName: connectorResource.connector_definition_name,
    accessToken,
  });

  const connectorResourceWithDefinition = {
    ...connectorResource,
    connector_definition: connectorResourceDefinition,
  };

  queryClient.setQueryData<ConnectorResourceWithDefinition>(
    ["connector-resources", connectorResource.name],
    connectorResourceWithDefinition
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
  const watch = await watchUserConnectorResource({
    connectorResourceName: connectorResource.name,
    accessToken,
  });

  queryClient.setQueryData<ConnectorResourceWatchState>(
    ["connectors", connectorResource.name, "watch"],
    watch
  );

  queryClient.setQueryData<ConnectorResourcesWatchState>(
    ["connectors", connectorResource.type, "watch"],
    (old) =>
      old
        ? {
            ...removeObjKey(old, connectorResource.name),
            [connectorResource.name]: watch,
          }
        : { [connectorResource.name]: watch }
  );
}
