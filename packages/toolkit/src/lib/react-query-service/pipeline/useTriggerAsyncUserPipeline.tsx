import { useMutation } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  TriggerAsyncUserPipelinePayload,
  triggerAsyncUserPipelineAction,
} from "../../vdp-sdk";

export const useTriggerAsyncUserPipeline = () => {
  return useMutation(
    async ({
      pipelineName,
      payload,
      accessToken,
      returnTraces,
    }: {
      pipelineName: string;
      payload: TriggerAsyncUserPipelinePayload;
      accessToken: Nullable<string>;
      returnTraces?: boolean;
    }) => {
      const pipelineRelease = await triggerAsyncUserPipelineAction({
        pipelineName,
        payload,
        accessToken,
        returnTraces,
      });
      return Promise.resolve(pipelineRelease);
    }
  );
};
