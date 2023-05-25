import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";
import { Pipeline, RawPipelineRecipeComponent } from "./types";

export type CreatePipelinePayload = {
  id: string;
  recipe: {
    version: string;
    components: RawPipelineRecipeComponent[];
  };
};

export type CreatePipelineResponse = {
  pipeline: Pipeline;
};

export async function createPipelineMutation({
  payload,
  accessToken,
}: {
  payload: CreatePipelinePayload;
  accessToken: Nullable<string>;
}) {
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
}

export type UpdatePipelinePayload = {
  name: string;
  description: Nullable<string>;
};

export type UpdatePipelineResponse = {
  pipeline: Pipeline;
};

export async function updatePipelineMutation({
  payload,
  accessToken,
}: {
  payload: UpdatePipelinePayload;
  accessToken: Nullable<string>;
}) {
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
}

export async function deletePipelineMutation({
  pipelineName,
  accessToken,
}: {
  pipelineName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    await client.delete(`/${pipelineName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}
