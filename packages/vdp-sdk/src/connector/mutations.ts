import { Nullable, AirbyteFieldValues } from "@instill-ai/toolkit";
import { createInstillAxiosClient } from "../helper";
import { Connector } from "./types";

export type CreateConnectorPayload = {
  connectorName: string;
  connector_definition_name: string;
  description?: string;
  configuration: Record<string, any> | Record<string, never>;
};

export type CreateConnectorResponse = {
  connector: Connector;
};

export async function createConnectorMutation({
  payload,
  accessToken,
}: {
  payload: CreateConnectorPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { connectorName, ...data } = payload;

    const res = await client.post<CreateConnectorResponse>("/connectors", {
      ...data,
      id: connectorName.split("/")[1],
    });
    return Promise.resolve(res.data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteConnectorMutation({
  connectorName,
  accessToken,
}: {
  connectorName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    await client.delete(`/${connectorName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type UpdateConnectorResponse = {
  connector: Connector;
};

export type UpdateConnectorPayload = {
  connectorName: string;
  description?: string;
  configuration: /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  Record<string, any> | AirbyteFieldValues | Record<string, never>;
};

export async function updateConnectorMutation({
  payload,
  accessToken,
}: {
  payload: UpdateConnectorPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { connectorName, ...data } = payload;

    const res = await client.patch<UpdateConnectorResponse>(
      `/${connectorName}`,
      data
    );
    return Promise.resolve(res.data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}
