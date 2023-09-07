import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";
import { Operation } from "../operation";
import { PipelineRelease, PipelineTriggerMetadata } from "./types";

export type TriggerUserPipelinePayload = {
  inputs: Record<string, any>[];
};

export type TriggerUserPipelineResponse = {
  outputs: Record<string, any>[];
  metadata: PipelineTriggerMetadata;
};

export async function triggerUserPipelineAction({
  pipelineName,
  payload,
  accessToken,
}: {
  pipelineName: string;
  payload: TriggerUserPipelinePayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.post<TriggerUserPipelineResponse>(
      `/${pipelineName}/trigger`,
      payload
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type TriggerAsyncUserPipelinePayload = {
  inputs: Record<string, any>[];
};

export type TriggerAsyncUserPipelineResponse = {
  operation: Operation;
};

export async function triggerAsyncUserPipelineAction({
  pipelineName,
  payload,
  accessToken,
}: {
  pipelineName: string;
  payload: TriggerAsyncUserPipelinePayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.post<TriggerAsyncUserPipelineResponse>(
      `/${pipelineName}/triggerAsync`,
      payload
    );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
}

/* -------------------------------------------------------------------------
 * Pipeline Release
 * -----------------------------------------------------------------------*/

export type SetDefaultUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export async function setDefaultUserPipelineReleaseMutation({
  pipelineReleaseName,
  accessToken,
}: {
  pipelineReleaseName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.post<SetDefaultUserPipelineReleaseResponse>(
      `/${pipelineReleaseName}/setDefault`
    );
    return Promise.resolve(data.release);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type RestoreUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export async function restoreUserPipelineReleaseMutation({
  pipelineReleaseName,
  accessToken,
}: {
  pipelineReleaseName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.post<RestoreUserPipelineReleaseResponse>(
      `/${pipelineReleaseName}/restore`
    );
    return Promise.resolve(data.release);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type TriggerUserPipelineReleasePayload = {
  inputs: Record<string, any>[];
};

export type TriggerUserPipelineReleaseResponse = {
  outputs: Record<string, any>[];
  metadata: PipelineTriggerMetadata;
};

export async function triggerUserPipelineReleaseAction({
  pipelineReleaseName,
  payload,
  accessToken,
}: {
  pipelineReleaseName: string;
  payload: TriggerUserPipelinePayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.post<TriggerUserPipelineResponse>(
      `/${pipelineReleaseName}/trigger`,
      payload
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type TriggerAsyncUserPipelineReleasePayload = {
  inputs: Record<string, any>[];
};

export type TriggerAsyncUserPipelineReleaseResponse = {
  operation: Operation;
};

export async function triggerAsyncUserPipelineReleaseAction({
  pipelineReleaseName,
  payload,
  accessToken,
}: {
  pipelineReleaseName: string;
  payload: TriggerAsyncUserPipelinePayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, "vdp");

    const { data } = await client.post<TriggerAsyncUserPipelineReleaseResponse>(
      `/${pipelineReleaseName}/triggerAsync`,
      payload
    );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
}
