import { Nullable } from "@instill-ai/toolkit";
import { createInstillAxiosClient } from "../helper";
import { Connector, ConnectorState } from "./types";

export type TestConnectorResponse = {
  state: ConnectorState;
};

export async function testConnectorConnectionAction({
  connectorName,
  accessToken,
}: {
  connectorName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.post<TestConnectorResponse>(
      `/${connectorName}/testConnection`
    );
    return Promise.resolve(data.state);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type ConnectConnectorResponse = {
  connector: Connector;
};

export async function connectConnectorAction({
  connectorName,
  accessToken,
}: {
  connectorName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.post<ConnectConnectorResponse>(
      `/${connectorName}/connect`
    );
    return Promise.resolve(data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type DisconnectConnectorResponse = {
  connector: Connector;
};

export async function disconnectConnectorAction({
  connectorName,
  accessToken,
}: {
  connectorName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.post<DisconnectConnectorResponse>(
      `/${connectorName}/disconnect`
    );
    return Promise.resolve(data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}
