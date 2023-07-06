import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";
import { Pipeline } from "./types";

export type ActivatePipelineResponse = {
  pipeline: Omit<Pipeline, "recipe"> & { recipe: null };
};

export async function activatePipelineMutation({
  pipelineName,
  accessToken,
}: {
  pipelineName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.post<ActivatePipelineResponse>(
      `/${pipelineName}/activate`
    );
    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type DeActivatePipelineResponse = {
  pipeline: Omit<Pipeline, "recipe"> & { recipe: null };
};

export async function deActivatePipelineMutation({
  pipelineName,
  accessToken,
}: {
  pipelineName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.post<DeActivatePipelineResponse>(
      `/${pipelineName}/deactivate`
    );
    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
}
