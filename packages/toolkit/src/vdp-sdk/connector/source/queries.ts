import { Nullable } from "../../../type";
import { env } from "../../../utility";
import { createInstillAxiosClient, getQueryString } from "../../helper";
import { ConnectorDefinition } from "../types";
import { Source, SourceWithDefinition } from "./types";

// ############################################################################
// # Source definition                                                        #
// ############################################################################

export type ListSourceDefinitionsResponse = {
  source_connector_definitions: ConnectorDefinition[];
  next_page_token: string;
  total_size: string;
};

export const listSourceDefinitionsQuery = async ({
  sourceName,
  pageSize,
  nextPageToken,
  accessToken,
}: {
  sourceName: string;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
}): Promise<ConnectorDefinition[]> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const sourceDefinitions: ConnectorDefinition[] = [];

    const queryString = getQueryString(
      `${env("NEXT_PUBLIC_API_VERSION")}/${sourceName}?view=VIEW_FULL`,
      pageSize,
      nextPageToken
    );

    const { data } = await client.get<ListSourceDefinitionsResponse>(
      queryString
    );

    sourceDefinitions.push(...data.source_connector_definitions);

    if (data.next_page_token) {
      sourceDefinitions.push(
        ...(await listSourceDefinitionsQuery({
          sourceName,
          pageSize,
          accessToken,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(sourceDefinitions);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type GetSourceDefinitionResponse = {
  source_connector_definition: ConnectorDefinition;
};

export const getSourceDefinitionQuery = async ({
  sourceDefinitionName,
  accessToken,
}: {
  sourceDefinitionName: string;
  accessToken: Nullable<string>;
}): Promise<ConnectorDefinition> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetSourceDefinitionResponse>(
      `${env("NEXT_PUBLIC_API_VERSION")}/${sourceDefinitionName}`
    );

    return Promise.resolve(data.source_connector_definition);
  } catch (err) {
    return Promise.reject(err);
  }
};

// ############################################################################
// # Source                                                                   #
// ############################################################################

export type GetSourceResponse = {
  source_connector: Source;
};

export const getSourceQuery = async ({
  sourceName,
  accessToken,
}: {
  sourceName: string;
  accessToken: Nullable<string>;
}): Promise<Source> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetSourceResponse>(
      `${env("NEXT_PUBLIC_API_VERSION")}/${sourceName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.source_connector);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type ListSourcesResponse = {
  source_connectors: Source[];
  next_page_token: string;
  total_size: string;
};

export const listSourcesQuery = async ({
  pageSize,
  nextPageToken,
  accessToken,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
}): Promise<Source[]> => {
  try {
    const client = createInstillAxiosClient(accessToken);
    const sources: Source[] = [];

    const queryString = getQueryString(
      `${env("NEXT_PUBLIC_API_VERSION")}/source-connectors?view=VIEW_FULL`,
      pageSize,
      nextPageToken
    );

    const { data } = await client.get<ListSourcesResponse>(queryString);

    sources.push(...data.source_connectors);

    if (data.next_page_token) {
      sources.push(
        ...(await listSourcesQuery({
          pageSize,
          accessToken,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(sources);
  } catch (err) {
    return Promise.reject(err);
  }
};
