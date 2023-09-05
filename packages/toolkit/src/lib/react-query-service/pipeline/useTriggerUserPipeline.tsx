import { useMutation } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  type TriggerUserPipelinePayload,
  triggerUserPipelineAction,
} from "../../vdp-sdk";

export const useTriggerUserPipeline = () => {
  return useMutation(
    async ({
      pipelineName,
      payload,
      accessToken,
    }: {
      pipelineName: string;
      payload: TriggerUserPipelinePayload;
      accessToken: Nullable<string>;
    }) => {
      const pipelineRelease = await triggerUserPipelineAction({
        pipelineName,
        payload,
        accessToken,
      });
      return Promise.resolve(pipelineRelease);
    }
  );
};
