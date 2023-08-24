import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";
import { ConnectorResource, ConnectorResourceState } from "./types";

export type TestConnectorResourceConnectionResponse = {
  state: ConnectorResourceState;
};

export async function testConnectorResourceConnectionAction({
  connectorResourceName,
  accessToken,
}: {
  connectorResourceName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.post<TestConnectorResourceConnectionResponse>(
      `/${connectorResourceName}/testConnection`
    );
    return Promise.resolve(data.state);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type ConnectConnectorResourceResponse = {
  connector_resource: ConnectorResource;
};

export async function connectConnectorResourceAction({
  connectorResourceName,
  accessToken,
}: {
  connectorResourceName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.post<ConnectConnectorResourceResponse>(
      `/${connectorResourceName}/connect`
    );
    return Promise.resolve(data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type DisconnectConnectorResourceResponse = {
  connector_resource: ConnectorResource;
};

export async function disconnectConnectorResourceAction({
  connectorResourceName,
  accessToken,
}: {
  connectorResourceName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.post<DisconnectConnectorResourceResponse>(
      `/${connectorResourceName}/disconnect`
    );
    return Promise.resolve(data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}
