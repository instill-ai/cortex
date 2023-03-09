import { AirbyteFieldValues } from "../../../airbytes";
import { Nullable } from "../../../type";
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

export const createDestinationMutation = async ({
  payload,
  accessToken,
}: {
  payload: CreateDestinationPayload;
  accessToken: Nullable<string>;
}): Promise<Destination> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<CreateDestinationResponse>(
      `/destination-connectors`,
      payload
    );
    return Promise.resolve(data.destination_connector);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteDestinationMutation = async ({
  destinationName,
  accessToken,
}: {
  destinationName: string;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

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

export const updateDestinationMutation = async ({
  payload,
  accessToken,
}: {
  payload: UpdateDestinationPayload;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);
    const { name, ...data } = payload;

    const res = await client.patch<UpdateDestinationResponse>(`/${name}`, data);
    return Promise.resolve(res.data.destination_connector);
  } catch (err) {
    return Promise.reject(err);
  }
};
