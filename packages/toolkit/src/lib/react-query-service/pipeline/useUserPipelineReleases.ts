import { useQuery } from "@tanstack/react-query";
import {
  ListUserPipelineReleasesQuery,
  getUserPipelineReleaseQuery,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";
import { env } from "../../utility";

export const useUserPipelineReleases = ({
  userName,
  pipelineName,
  enabled,
  accessToken,
  retry,
}: {
  userName: string;
  pipelineName: string;
  enabled: boolean;
  accessToken: Nullable<string>;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery(
    ["pipelineReleases", userName],
    async () => {
      const pipelineReleases = await ListUserPipelineReleasesQuery({
        userName,
        pipelineName,
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
      });
      return Promise.resolve(pipelineReleases);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
