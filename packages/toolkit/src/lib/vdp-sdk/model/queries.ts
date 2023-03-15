import { Nullable } from "../../type";
import { createInstillAxiosClient, getQueryString } from "../helper";
import { Operation } from "../types";
import {
  Model,
  ModelDefinition,
  ModelInstance,
  ModelInstanceReadme,
} from "./types";

// ############################################################################
// # Model Definition                                                         #
// ############################################################################

export type GetModelDefinitionResponse = {
  model_definition: ModelDefinition;
};

export const getModelDefinitionQuery = async ({
  modelDefinitionName,
  accessToken,
}: {
  modelDefinitionName: string;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetModelDefinitionResponse>(
      `/${modelDefinitionName}`
    );

    return Promise.resolve(data.model_definition);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type ListModelDefinitionsResponse = {
  model_definitions: ModelDefinition[];
  next_page_token: string;
  total_size: string;
};

export const listModelDefinitionsQuery = async ({
  pageSize,
  nextPageToken,
  accessToken,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
}): Promise<ModelDefinition[]> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const modelDefinitions: ModelDefinition[] = [];

    const queryString = getQueryString(
      "/model-definitions",
      pageSize,
      nextPageToken
    );

    const { data } = await client.get<ListModelDefinitionsResponse>(
      queryString
    );

    modelDefinitions.push(...data.model_definitions);

    if (data.next_page_token) {
      modelDefinitions.push(
        ...(await listModelDefinitionsQuery({
          pageSize,
          accessToken,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(modelDefinitions);
  } catch (err) {
    return Promise.reject(err);
  }
};

// ############################################################################
// # Model                                                                    #
// ############################################################################

export type GetModelResponse = {
  model: Model;
};

export const getModelQuery = async ({
  modelName,
  accessToken,
}: {
  modelName: string;
  accessToken: Nullable<string>;
}): Promise<Model> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetModelResponse>(
      `/${modelName}?view=VIEW_FULL`
    );
    return Promise.resolve(data.model);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type ListModelsResponse = {
  models: Model[];
  next_page_token: string;
  total_size: string;
};

export const listModelsQuery = async ({
  pageSize,
  nextPageToken,
  accessToken,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
}): Promise<Model[]> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const models: Model[] = [];

    const queryString = getQueryString(
      "/models?view=VIEW_FULL",
      pageSize,
      nextPageToken
    );

    const { data } = await client.get<ListModelsResponse>(queryString);

    models.push(...data.models);

    if (data.next_page_token) {
      models.push(
        ...(await listModelsQuery({
          pageSize,
          accessToken,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(models);
  } catch (err) {
    return Promise.reject(err);
  }
};

// ############################################################################
// # Model Instance                                                           #
// ############################################################################

export type GetModelInstanceResponse = {
  instance: ModelInstance;
};

export const getModelInstanceQuery = async ({
  modelInstanceName,
  accessToken,
}: {
  modelInstanceName: string;
  accessToken: Nullable<string>;
}): Promise<ModelInstance> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetModelInstanceResponse>(
      `/${modelInstanceName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.instance);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type ListModelInstancesResponse = {
  instances: ModelInstance[];
  next_page_token: string;
  total_size: string;
};

export const listModelInstancesQuery = async ({
  modelName,
  pageSize,
  nextPageToken,
  accessToken,
}: {
  modelName: string;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
}): Promise<ModelInstance[]> => {
  try {
    const client = createInstillAxiosClient(accessToken);
    const modelInstances: ModelInstance[] = [];

    const queryString = getQueryString(
      `/${modelName}/instances?view=VIEW_FULL`,
      pageSize,
      nextPageToken
    );

    const { data } = await client.get<ListModelInstancesResponse>(queryString);

    modelInstances.push(...data.instances);

    if (data.next_page_token) {
      modelInstances.push(
        ...(await listModelInstancesQuery({
          modelName,
          pageSize,
          nextPageToken: data.next_page_token,
          accessToken,
        }))
      );
    }

    return Promise.resolve(modelInstances);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type GetModelInstanceReadmeQuery = {
  readme: ModelInstanceReadme;
};

export const getModelInstanceReadme = async ({
  modelInstanceName,
  accessToken,
}: {
  modelInstanceName: string;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetModelInstanceReadmeQuery>(
      `/${modelInstanceName}/readme`
    );
    return Promise.resolve(data.readme);
  } catch (err) {
    return Promise.reject(err);
  }
};

// ############################################################################
// # Model Operation                                                          #
// ############################################################################

export type GetModelOperationResponse = {
  operation: Operation;
};

export const getModelOperationQuery = async ({
  operationName,
  accessToken,
}: {
  operationName: string;
  accessToken: Nullable<string>;
}): Promise<Operation> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetModelOperationResponse>(
      `/${operationName}`
    );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
};
