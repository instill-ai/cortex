import { Operation } from "../types";
import { env } from "../../utility";
import { createInstillAxiosClient } from "../helper";
import { Nullable } from "../../type";

export type DeployModelResponse = {
  operation: Operation;
};

export const deployModelInstanceAction = async ({
  modelInstanceName,
  accessToken,
}: {
  modelInstanceName: string;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<DeployModelResponse>(
      `/${modelInstanceName}/deploy`
    );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type UnDeployModelResponse = {
  operation: Operation;
};

export const unDeployModelInstanceAction = async ({
  modelInstanceName,
  accessToken,
}: {
  modelInstanceName: string;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<UnDeployModelResponse>(
      `/${modelInstanceName}/undeploy`
    );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type TestModelInstancePayload = {
  modelInstanceName: string;
  content: File;
};

type TestModelInstanceResult = {
  category: string;
  score: number;
};

export type TestModelInstanceResponse = {
  output: Record<string, TestModelInstanceResult[]>;
};

export const testModelInstance = async ({
  payload,
  accessToken,
}: {
  payload: TestModelInstancePayload;
  accessToken: Nullable<string>;
}) => {
  try {
    const formData = new FormData();
    formData.append("file", payload.content);

    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<TestModelInstanceResponse>(
      `/${payload.modelInstanceName}/test-multipart`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};
