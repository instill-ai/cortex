import { useMutation } from "@tanstack/react-query";
import { Nullable } from "../../type";
import {
  type TriggerUserPipelinePayload,
  triggerUserPipelineReleaseAction,
} from "../../vdp-sdk";

export const useTriggerUserPipelineRelease = () => {
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
      const pipelineRelease = await triggerUserPipelineReleaseAction({
        pipelineReleaseName,
        payload,
        accessToken,
      });
      return Promise.resolve(pipelineRelease);
    }
  );
};
