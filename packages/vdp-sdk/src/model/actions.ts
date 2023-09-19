import { Operation } from "../operation";
import { createInstillAxiosClient } from "../helper";
import { Nullable } from "../types";

export type DeployModelResponse = {
  operation: Operation;
};

export async function deployModelAction({
  modelName,
  accessToken,
}: {
  modelName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "model");

    const { data } = await client.post<DeployModelResponse>(
      `/${modelName}/deploy`
    );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type UnDeployModelResponse = {
  operation: Operation;
};

export async function unDeployModeleAction({
  modelName,
  accessToken,
}: {
  modelName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "model");

    const { data } = await client.post<UnDeployModelResponse>(
      `/${modelName}/undeploy`
    );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
}
