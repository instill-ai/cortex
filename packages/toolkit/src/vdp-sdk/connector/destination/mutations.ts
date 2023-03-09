import { AirbyteFieldValues } from "../../../airbytes";
import { createInstillAxiosClient } from "../../helper";
import { Destination } from "./types";

export type CreateDestinationResponse = {
  destination_connector: Destination;
};

export type CreateDestinationPayload = {
  id: string;
  destination_connector_definition: string;
  connector: {
    description?: string;
    configuration: /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Record<string, any> | AirbyteFieldValues | Record<string, never>;
  };
};

export const createDestinationMutation = async (
  payload: CreateDestinationPayload,
  authToken?: string
): Promise<Destination> => {
  try {
    const client = createInstillAxiosClient(authToken);

    const { data } = await client.post<CreateDestinationResponse>(
      `/destination-connectors`,
      payload
    );
    return Promise.resolve(data.destination_connector);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteDestinationMutation = async (
  destinationName: string,
  authToken?: string
) => {
  try {
    const client = createInstillAxiosClient(authToken);

    await client.delete(`/${destinationName}`);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type UpdateDestinationResponse = {
  destination_connector: Destination;
};

export type UpdateDestinationPayload = {
  name: string;
  connector: {
    description?: string;
    configuration: /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Record<string, any> | AirbyteFieldValues | Record<string, never>;
  };
};

export const updateDestinationMutation = async (
  payload: UpdateDestinationPayload,
  authToken?: string
) => {
  try {
    const client = createInstillAxiosClient(authToken);
    const { name, ...data } = payload;

    const res = await client.patch<UpdateDestinationResponse>(`/${name}`, data);
    return Promise.resolve(res.data.destination_connector);
  } catch (err) {
    return Promise.reject(err);
  }
};
