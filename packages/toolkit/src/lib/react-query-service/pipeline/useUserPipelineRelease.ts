import { useQuery } from "@tanstack/react-query";
import { getUserPipelineReleaseQuery } from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useUserPipelineRelease = ({
  pipelineReleaseName,
  enabled,
  accessToken,
  retry,
}: {
  pipelineReleaseName: string;
  enabled: boolean;
  accessToken: Nullable<string>;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery(
    ["pipelineReleases", pipelineReleaseName],
    async () => {
      const pipelineRelease = await getUserPipelineReleaseQuery({
        pipelineReleaseName,
        accessToken,
      });
      return Promise.resolve(pipelineRelease);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
