import { Nullable } from "@instill-ai/toolkit";
import { createInstillAxiosClient, getQueryString } from "../helper";
import { PipelineWatchState, Pipeline } from "./types";

export type ListPipelinesResponse = {
  pipelines: Pipeline[];
  next_page_token: string;
  total_size: string;
};

export async function listPipelinesQuery({
  pageSize,
  nextPageToken,
  accessToken,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const pipelines: Pipeline[] = [];

    const queryString = getQueryString(
      `/pipelines?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      null
    );

    const { data } = await client.get<ListPipelinesResponse>(queryString);

    pipelines.push(...data.pipelines);

    if (data.next_page_token) {
      pipelines.push(
        ...(await listPipelinesQuery({
          pageSize,
          accessToken,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(pipelines);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type GetPipelineResponse = {
  pipeline: Pipeline;
};

export async function getPipelineQuery({
  pipelineName,
  accessToken,
}: {
  pipelineName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.get<GetPipelineResponse>(
      `/${pipelineName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
}

/* -------------------------------------------------------------------------
 * Watch Pipeline State
 * -----------------------------------------------------------------------*/

export async function watchPipeline({
  pipelineName,
  accessToken,
}: {
  pipelineName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");
    const { data } = await client.get<PipelineWatchState>(
      `/${pipelineName}/watch`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
