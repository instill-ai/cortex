import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";
import { ConnectorState } from "./types";

export type TestConnectorResponse = {
  state: ConnectorState;
};

export async function testConnectorConnectionAction({
  connectorName,
  accessToken,
}: {
  connectorName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.post<TestConnectorResponse>(
      `/${connectorName}/testConnection`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
