import { Nullable } from "../../../type";
import { env } from "../../../utility";
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

export const createSourceMutation = async ({
  payload,
  accessToken,
}: {
  payload: CreateSourcePayload;
  accessToken: Nullable<string>;
}): Promise<Source> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<CreateSourceResponse>(
      `${env("NEXT_PUBLIC_API_VERSION")}/source-connectors`,
      payload
    );
    return Promise.resolve(data.source_connector);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteSourceMutation = async ({
  sourceName,
  accessToken,
}: {
  sourceName: string;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    await client.delete(`${env("NEXT_PUBLIC_API_VERSION")}/${sourceName}`);
  } catch (err) {
    return Promise.reject(err);
  }
};
