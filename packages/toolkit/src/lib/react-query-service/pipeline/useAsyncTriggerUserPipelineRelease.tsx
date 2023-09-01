import { useMutation } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  type TriggerUserPipelinePayload,
  triggerAsyncUserPipelineReleaseAction,
} from "../../vdp-sdk";

export const useAsyncTriggerUserPipelineRelease = () => {
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
      const pipelineRelease = await triggerAsyncUserPipelineReleaseAction({
        pipelineName,
        payload,
        accessToken,
      });
      return Promise.resolve(pipelineRelease);
    }
  );
};
