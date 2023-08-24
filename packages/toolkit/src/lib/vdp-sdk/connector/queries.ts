import { Nullable } from "../../type";
import { createInstillAxiosClient, getQueryString } from "../helper";
import {
  ConnectorDefinition,
  ConnectorResourceWatchState,
  ConnectorResourceWithDefinition,
} from "./types";

export type ListConnectorResourcesResponse = {
  connector_resources: ConnectorResourceWithDefinition[];
  next_page_token: string;
  total_size: string;
};

export async function listConnectorResourcesQuery({
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
    const connectors: ConnectorResourceWithDefinition[] = [];

    const queryString = getQueryString(
      `/connector-resources?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      filter
    );

    const { data } = await client.get<ListConnectorResourcesResponse>(
      queryString
    );

    connectors.push(...data.connector_resources);

    if (data.next_page_token) {
      connectors.push(
        ...(await listConnectorResourcesQuery({
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

export type GetConnectorResourceResponse = {
  connector_resource: ConnectorResourceWithDefinition;
};

export async function getConnectorResourceQuery({
  connectorResourceName,
  accessToken,
}: {
  connectorResourceName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.get<GetConnectorResourceResponse>(
      `/${connectorResourceName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function watchConnectorResource({
  connectorResourceName,
  accessToken,
}: {
  connectorResourceName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.get<ConnectorResourceWatchState>(
      `/${connectorResourceName}/watch`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
