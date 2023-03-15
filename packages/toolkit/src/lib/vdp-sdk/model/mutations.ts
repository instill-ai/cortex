import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";
import { Operation } from "../types";
import { Model } from "./types";

export type CreateGithubModelConfiguration = {
  repository: string;
};

export type CreateGithubModelPayload = {
  id: string;
  model_definition: string;
  description: Nullable<string>;
  configuration: CreateGithubModelConfiguration;
};

export type CreateGithubModelResponse = {
  operation: Operation;
};

export const createGithubModelMutation = async ({
  payload,
  accessToken,
}: {
  payload: CreateGithubModelPayload;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<CreateGithubModelResponse>("/models", {
      id: payload.id,
      model_definition: payload.model_definition,
      description: payload.description ?? undefined,
      configuration: {
        repository: payload.configuration.repository,
      },
    });
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type CreateLocalModelConfiguration = {
  content: File;
};

export type CreateLocalModelPayload = {
  id: string;
  description: Nullable<string>;
  model_definition: string;
  configuration: CreateLocalModelConfiguration;
};

export type CreateLocalModelResponse = {
  operation: Operation;
};

export const createLocalModelMutation = async ({
  payload,
  accessToken,
}: {
  payload: CreateLocalModelPayload;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const formData = new FormData();
    formData.append("id", payload.id);
    formData.append("model_definition", payload.model_definition);
    formData.append("content", payload.configuration.content);

    if (payload.description) {
      formData.append("description", payload.description);
    }

    const { data } = await client.post<CreateLocalModelResponse>(
      "/models/multipart",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type ArtivcConfiguration = {
  url: string;
  credential: Nullable<string>;
};

export type CreateArtivcModelPayload = {
  id: string;
  model_definition: string;
  description: Nullable<string>;
  configuration: ArtivcConfiguration;
};

export type CreateArtivcModelResponse = {
  operation: Operation;
};

export const createArtivcModelMutation = async ({
  payload,
  accessToken,
}: {
  payload: CreateArtivcModelPayload;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<CreateLocalModelResponse>("/models", {
      id: payload.id,
      model_definition: payload.model_definition,
      description: payload.description ?? undefined,
      configuration: {
        url: payload.configuration.url,
        credential: payload.configuration.credential
          ? JSON.parse(payload.configuration.credential)
          : undefined,
      },
    });
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type HuggingFaceConfiguration = {
  repo_id: string;
};

export type CreateHuggingFaceModelPayload = {
  id: string;
  model_definition: string;
  description: Nullable<string>;
  configuration: HuggingFaceConfiguration;
};

export type CreateHuggingFaceModelResponse = {
  operation: Operation;
};

export const createHuggingFaceModelMutation = async ({
  payload,
  accessToken,
}: {
  payload: CreateHuggingFaceModelPayload;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<CreateLocalModelResponse>("/models", {
      id: payload.id,
      model_definition: payload.model_definition,
      description: payload.description ?? undefined,
      configuration: {
        repo_id: payload.configuration.repo_id,
      },
    });
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type UpdateModelPayload = Partial<Model> & {
  name: string;
};

export type UpdateModelResponse = {
  model: Model;
};

export const updateModelMutation = async ({
  payload,
  accessToken,
}: {
  payload: UpdateModelPayload;
  accessToken: Nullable<string>;
}): Promise<Model> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.patch<UpdateModelResponse>(
      `/${payload.name}`,
      payload
    );
    return Promise.resolve(data.model);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteModelMutation = async ({
  modelName,
  accessToken,
}: {
  modelName: string;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    await client.delete(`/${modelName}`);
  } catch (err) {
    return Promise.reject(err);
  }
};
