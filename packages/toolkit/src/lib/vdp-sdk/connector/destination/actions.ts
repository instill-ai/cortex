import { Nullable } from "../../../type";
import { createInstillAxiosClient } from "../../helper";
import { ConnectorState } from "../types";

export type TestDestinationesponse = {
  state: ConnectorState;
};

export async function testDestinationConnectionAction({
  destinationName,
  accessToken,
}: {
  destinationName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.post<TestDestinationesponse>(
      `/${destinationName}/testConnection`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
