import { Nullable } from "../../type";
import { env } from "../../utility";
import { createInstillAxiosClient } from "../helper";
import { PipelineWithRawRecipe } from "./types";

export type CreatePipelinePayload = {
  id: string;
  recipe: {
    source: string;
    model_instances: string[];
    destination: string;
  };
};

export type CreatePipelineResponse = {
  pipeline: PipelineWithRawRecipe;
};

export const createPipelineMutation = async ({
  payload,
  accessToken,
}: {
  payload: CreatePipelinePayload;
  accessToken: Nullable<string>;
}): Promise<PipelineWithRawRecipe> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<CreatePipelineResponse>(
      "/pipelines",
      payload
    );
    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type UpdatePipelinePayload = {
  name: string;
  description: Nullable<string>;
};

export type UpdatePipelineResponse = {
  pipeline: PipelineWithRawRecipe;
};

export const updatePipelineMutation = async ({
  payload,
  accessToken,
}: {
  payload: UpdatePipelinePayload;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.patch<UpdatePipelineResponse>(
      `/${payload.name}`,
      {
        ...payload,
        description: payload.description ?? undefined,
      }
    );
    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deletePipelineMutation = async ({
  pipelineName,
  accessToken,
}: {
  pipelineName: string;
  accessToken: Nullable<string>;
}) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    await client.delete(`/${pipelineName}`);
  } catch (err) {
    return Promise.reject(err);
  }
};
