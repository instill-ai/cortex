import { useMutation } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  type TriggerUserPipelinePayload,
  triggerAsyncUserPipelineReleaseAction,
} from "../../vdp-sdk";

export const useTriggerAsyncUserPipelineRelease = () => {
  return useMutation(
    async ({
      pipelineReleaseName,
      payload,
      accessToken,
    }: {
      pipelineReleaseName: string;
      payload: TriggerUserPipelinePayload;
      accessToken: Nullable<string>;
    }) => {
      const pipelineRelease = await triggerAsyncUserPipelineReleaseAction({
        pipelineReleaseName,
        payload,
        accessToken,
      });
      return Promise.resolve(pipelineRelease);
    }
  );
};
