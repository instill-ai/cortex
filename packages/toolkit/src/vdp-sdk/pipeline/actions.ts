import { Nullable } from "../../type";
import { env } from "../../utility";
import { createInstillAxiosClient } from "../helper";
import { PipelineWithRawRecipe } from "./types";

export type ActivatePipelineResponse = {
  pipeline: PipelineWithRawRecipe;
};

export const activatePipelineMutation = async (
  pipelineName: string,
  accessToken: Nullable<string>
) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<ActivatePipelineResponse>(
      `${env("NEXT_PUBLIC_API_VERSION")}/${pipelineName}/activate`
    );
    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
};

export type DeActivatePipelineResponse = {
  pipeline: PipelineWithRawRecipe;
};

export const deActivatePipelineMutation = async (
  pipelineName: string,
  accessToken: Nullable<string>
) => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<DeActivatePipelineResponse>(
      `${env("NEXT_PUBLIC_API_VERSION")}/${pipelineName}/deactivate`
    );
    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
};
