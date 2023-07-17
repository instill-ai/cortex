import { Nullable } from "../../../type";
import { createInstillAxiosClient, getQueryString } from "../../helper";
import { PipelineTriggerRecord } from "./types";

export type ListPipelineTriggerRecordsResponse = {
  pipeline_trigger_records: PipelineTriggerRecord[];
  next_page_token: string;
  total_size: string;
};

export async function listPipelineTriggerRecordsQuery({
  pageSize,
  nextPageToken,
  accessToken,
  filter,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  accessToken: Nullable<string>;
  filter: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "base");
    const triggers: PipelineTriggerRecord[] = [];

    const queryString = getQueryString(
      `/metrics/vdp/pipeline/triggers`,
      pageSize,
      nextPageToken,
      filter
    );

    const { data } = await client.get<ListPipelineTriggerRecordsResponse>(
      queryString
    );

    triggers.push(...data.pipeline_trigger_records);

    if (data.next_page_token) {
      triggers.push(
        ...(await listPipelineTriggerRecordsQuery({
          pageSize,
          accessToken,
          nextPageToken: data.next_page_token,
          filter,
        }))
      );
    }

    return Promise.resolve(triggers);
  } catch (err) {
    return Promise.reject(err);
  }
}
