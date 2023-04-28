import type { Nullable } from "../../../type";
import { createInstillAxiosClient, getQueryString } from "../../helper";
import type { ConnectorDefinition, ConnectorWatchState } from "../types";
import type { Destination } from "./types";

// ############################################################################
// # Destination definition                                                   #
// ############################################################################

export type ListDestinationDefinitionsResponse = {
  destination_connector_definitions: ConnectorDefinition[];
  next_page_token: string;
  total_size: string;
};

export type ListDestinationDefinitionsPayload = {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
};

export async function listDestinationDefinitionsQuery({
  pageSize,
  nextPageToken,
  accessToken,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);
    const destinationDefinitions: ConnectorDefinition[] = [];
    const queryString = getQueryString(
      `/destination-connector-definitions?view=VIEW_FULL`,
      pageSize,
      nextPageToken
    );

    const { data } = await client.get<ListDestinationDefinitionsResponse>(
      queryString
    );

    destinationDefinitions.push(...data.destination_connector_definitions);

    if (data.next_page_token) {
      destinationDefinitions.push(
        ...(await listDestinationDefinitionsQuery({
          pageSize,
          accessToken,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(destinationDefinitions);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type GetDestinationDefinitionResponse = {
  destination_connector_definition: ConnectorDefinition;
};

export async function getDestinationDefinitionQuery({
  destinationDefinitionName,
  accessToken,
}: {
  destinationDefinitionName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetDestinationDefinitionResponse>(
      `/${destinationDefinitionName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.destination_connector_definition);
  } catch (err) {
    return Promise.reject(err);
  }
}

// ############################################################################
// # Destination                                                              #
// ############################################################################

export type GetDestinationResponse = {
  destination_connector: Destination;
};

export async function getDestinationQuery({
  destinationName,
  accessToken,
}: {
  destinationName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetDestinationResponse>(
      `/${destinationName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.destination_connector);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type ListDestinationsResponse = {
  destination_connectors: Destination[];
  next_page_token: string;
  total_size: string;
};

export async function listDestinationsQuery({
  pageSize,
  nextPageToken,
  accessToken,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);
    const destinations: Destination[] = [];

    const queryString = getQueryString(
      `destination-connectors?view=VIEW_FULL`,
      pageSize,
      nextPageToken
    );

    const { data } = await client.get<ListDestinationsResponse>(queryString);

    destinations.push(...data.destination_connectors);

    if (data.next_page_token) {
      destinations.push(
        ...(await listDestinationsQuery({
          pageSize,
          accessToken,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(destinations);
  } catch (err) {
    return Promise.reject(err);
  }
}

/* -------------------------------------------------------------------------
 * Watch Destination State
 * -----------------------------------------------------------------------*/

export async function watchDestination({
  destinationName,
  accessToken,
}: {
  destinationName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);
    const { data } = await client.get<ConnectorWatchState>(
      `/${destinationName}/watch`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
