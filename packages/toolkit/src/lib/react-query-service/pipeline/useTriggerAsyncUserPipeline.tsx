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
    }: {
      pipelineName: string;
      payload: TriggerAsyncUserPipelinePayload;
      accessToken: Nullable<string>;
    }) => {
      const pipelineRelease = await triggerAsyncUserPipelineAction({
        pipelineName,
        payload,
        accessToken,
      });
      return Promise.resolve(pipelineRelease);
    }
  );
};
