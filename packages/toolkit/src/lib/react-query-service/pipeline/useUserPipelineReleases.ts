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
  userName: Nullable<string>;
  pipelineName: Nullable<string>;
  enabled: boolean;
  accessToken: Nullable<string>;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  let enableQuery = false;

  if (userName && pipelineName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["pipelineReleases", userName],
    async () => {
      if (!userName) {
        return Promise.reject(new Error("userName not provided"));
      }

      if (!pipelineName) {
        return Promise.reject(new Error("pipelineName not provided"));
      }

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
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
