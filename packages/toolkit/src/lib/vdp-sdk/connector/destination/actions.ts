import { Nullable } from "../../../type";
import { createInstillAxiosClient } from "../../helper";
import { ConnectorState } from "../types";

export type TestDestinationesponse = {
  state: ConnectorState;
};

export async function testDestination({
  destinationName,
  accessToken,
}: {
  destinationName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);
    const { data } = await client.get<TestDestinationesponse>(
      `/${destinationName}/testConnection`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
