import { Nullable } from "../../type";
import { createInstillAxiosClient, getQueryString } from "../helper";
import {
  ConnectorDefinition,
  ConnectorWatchState,
  ConnectorWithDefinition,
} from "./types";

export type ListConnectorsResponse = {
  connectors: ConnectorWithDefinition[];
  next_page_token: string;
  total_size: string;
};

export async function listConnectorsQuery({
  pageSize,
  nextPageToken,
  accessToken,
  filter,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
  filter: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const connectors: ConnectorWithDefinition[] = [];

    const queryString = getQueryString(
      `/connector-resources?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      filter
    );

    const { data } = await client.get<ListConnectorsResponse>(queryString);

    connectors.push(...data.connectors);

    if (data.next_page_token) {
      connectors.push(
        ...(await listConnectorsQuery({
          pageSize,
          accessToken,
          nextPageToken: data.next_page_token,
          filter,
        }))
      );
    }

    return Promise.resolve(connectors);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type ListConnectorDefinitionsResponse = {
  connector_definitions: ConnectorDefinition[];
  next_page_token: string;
  total_size: string;
};

export async function listConnectorDefinitionsQuery({
  pageSize,
  nextPageToken,
  accessToken,
  filter,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
  filter: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const connectorDefinitions: ConnectorDefinition[] = [];

    const queryString = getQueryString(
      `/connector-definitions?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      filter
    );

    const { data } = await client.get<ListConnectorDefinitionsResponse>(
      queryString
    );

    connectorDefinitions.push(...data.connector_definitions);

    if (data.next_page_token) {
      connectorDefinitions.push(
        ...(await listConnectorDefinitionsQuery({
          pageSize,
          accessToken,
          nextPageToken: data.next_page_token,
          filter,
        }))
      );
    }

    return Promise.resolve(connectorDefinitions);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type GetConnectorDefinitionResponse = {
  connector_definition: ConnectorDefinition;
};

export async function getConnectorDefinitionQuery({
  connectorDefinitionName,
  accessToken,
}: {
  connectorDefinitionName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.get<GetConnectorDefinitionResponse>(
      `/${connectorDefinitionName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.connector_definition);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type GetConnectorResponse = {
  connector: ConnectorWithDefinition;
};

export async function getConnectorQuery({
  connectorName,
  accessToken,
}: {
  connectorName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.get<GetConnectorResponse>(
      `/${connectorName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function watchConnector({
  connectorName,
  accessToken,
}: {
  connectorName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.get<ConnectorWatchState>(
      `/${connectorName}/watch`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
