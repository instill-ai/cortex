import { Nullable } from "../../../type";
import { createInstillAxiosClient } from "../../helper";
import { Source } from "./types";

export type CreateSourceResponse = {
  source_connector: Source;
};

export type CreateSourcePayload = {
  id: string;
  source_connector_definition: string;
  connector: {
    description?: string;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    configuration: Record<string, any> | Record<string, never>;
  };
};

export async function createSourceMutation({
  payload,
  accessToken,
}: {
  payload: CreateSourcePayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<CreateSourceResponse>(
      "/source-connectors",
      payload
    );
    return Promise.resolve(data.source_connector);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteSourceMutation({
  sourceName,
  accessToken,
}: {
  sourceName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    await client.delete(`/${sourceName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}
