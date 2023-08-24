import { AirbyteFieldValues } from "../../airbytes";
import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";
import { ConnectorResource } from "./types";

export type CreateConnectorResourcePayload = {
  connectorResourceName: string;
  connector_definition_name: string;
  description?: string;
  configuration: Record<string, any> | Record<string, never>;
};

export type CreateConnectorResourceResponse = {
  connector_resource: ConnectorResource;
};

export async function createConnectorResourceMutation({
  payload,
  accessToken,
}: {
  payload: CreateConnectorResourcePayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { connectorResourceName, ...data } = payload;

    const res = await client.post<CreateConnectorResourceResponse>(
      "/connector-resources",
      {
        ...data,
        id: connectorResourceName.split("/")[1],
      }
    );
    return Promise.resolve(res.data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteConnectorResourceMutation({
  connectorResourceName,
  accessToken,
}: {
  connectorResourceName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    await client.delete(`/${connectorResourceName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type UpdateConnectorResourceResponse = {
  connector_resource: ConnectorResource;
};

export type UpdateConnectorResourcePayload = {
  connectorResourceName: string;
  description?: string;
  configuration: /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  Record<string, any> | AirbyteFieldValues | Record<string, never>;
};

export async function updateConnectorResourceMutation({
  payload,
  accessToken,
}: {
  payload: UpdateConnectorResourcePayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { connectorResourceName, ...data } = payload;

    const res = await client.patch<UpdateConnectorResourceResponse>(
      `/${connectorResourceName}`,
      data
    );
    return Promise.resolve(res.data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}
