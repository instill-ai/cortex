import { Nullable } from "../../../type";
import { createInstillAxiosClient } from "../../helper";
import { ConnectorState } from "../types";

export type TestSourceResponse = {
  state: ConnectorState;
};

export async function testSourceConnectionAction({
  sourceName,
  accessToken,
}: {
  sourceName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);
    const { data } = await client.get<TestSourceResponse>(
      `/${sourceName}/testConnection`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
