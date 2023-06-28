import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";
import { Operation } from "../operation";
import { Model } from "./types";

export type CreateGithubModelConfiguration = {
  repository: string;
  tag: string;
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

export async function createGithubModelMutation({
  payload,
  accessToken,
}: {
  payload: CreateGithubModelPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "model");

    const { data } = await client.post<CreateGithubModelResponse>("/models", {
      id: payload.id,
      model_definition: payload.model_definition,
      description: payload.description ?? undefined,
      configuration: {
        repository: payload.configuration.repository,
        tag: payload.configuration.tag,
      },
    });
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
}

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

export async function createLocalModelMutation({
  payload,
  accessToken,
}: {
  payload: CreateLocalModelPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "model");

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
}

export type ArtivcConfiguration = {
  url: string;
  tag: string;
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

export async function createArtivcModelMutation({
  payload,
  accessToken,
}: {
  payload: CreateArtivcModelPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "model");

    const { data } = await client.post<CreateLocalModelResponse>("/models", {
      id: payload.id,
      model_definition: payload.model_definition,
      description: payload.description ?? undefined,
      configuration: {
        url: payload.configuration.url,
        credential: payload.configuration.credential
          ? JSON.parse(payload.configuration.credential)
          : undefined,
        tag: payload.configuration.tag,
      },
    });
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
}

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

export async function createHuggingFaceModelMutation({
  payload,
  accessToken,
}: {
  payload: CreateHuggingFaceModelPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "model");

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
}

export type UpdateModelPayload = Partial<Model> & {
  name: string;
};

export type UpdateModelResponse = {
  model: Model;
};

export async function updateModelMutation({
  payload,
  accessToken,
}: {
  payload: UpdateModelPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "model");

    const { data } = await client.patch<UpdateModelResponse>(
      `/${payload.name}`,
      payload
    );
    return Promise.resolve(data.model);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteModelMutation({
  modelName,
  accessToken,
}: {
  modelName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "model");

    await client.delete(`/${modelName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}
