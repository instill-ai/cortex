import { Nullable } from "../types";
import { createInstillAxiosClient } from "../helper";
import { Pipeline, RawPipelineRecipeComponent } from "./types";

export type CreatePipelinePayload = {
  id: string;
  description?: string;
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
    const client = createInstillAxiosClient(accessToken, "vdp");

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
  description?: string;
  recipe?: {
    version: string;
    components: RawPipelineRecipeComponent[];
  };
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
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.patch<UpdatePipelineResponse>(
      `/${payload.name}`,
      payload
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
    const client = createInstillAxiosClient(accessToken, "vdp");

    await client.delete(`/${pipelineName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type RenamePipelinePayload = {
  pipelineId: string;
  newPipelineId: string;
};

export async function renamePipelineMutation({
  payload,
  accessToken,
}: {
  payload: RenamePipelinePayload;
  accessToken: Nullable<string>;
}) {
  const { pipelineId, newPipelineId } = payload;

  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.post(`/pipelines/${pipelineId}/rename`, {
      new_pipeline_id: newPipelineId,
    });

    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
}
