import { Nullable } from "../../type";
import { createInstillAxiosClient, getQueryString } from "../helper";
import { PipelineWithRawRecipe } from "./types";

export type ListPipelinesResponse = {
  pipelines: PipelineWithRawRecipe[];
  next_page_token: string;
  total_size: string;
};

export const listPipelinesQuery = async ({
  pageSize,
  nextPageToken,
  accessToken,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
}): Promise<PipelineWithRawRecipe[]> => {
  try {
    const client = createInstillAxiosClient(accessToken);
    const pipelines: PipelineWithRawRecipe[] = [];

    const queryString = getQueryString(
      `/pipelines?view=VIEW_FULL`,
      pageSize,
      nextPageToken
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
};

export type GetPipelineResponse = {
  pipeline: PipelineWithRawRecipe;
};

export const getPipelineQuery = async ({
  pipelineName,
  accessToken,
}: {
  pipelineName: string;
  accessToken: Nullable<string>;
}): Promise<PipelineWithRawRecipe> => {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.get<GetPipelineResponse>(
      `/${pipelineName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
};
