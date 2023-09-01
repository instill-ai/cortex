import { useQuery } from "@tanstack/react-query";
import { listPipelinesQuery, listUserPipelinesQuery } from "../../vdp-sdk";
import { env } from "../../utility";
import type { Nullable } from "../../type";

export async function fetchUserPipelines(
  userName: string,
  accessToken: Nullable<string>
) {
  try {
    const pipelines = await listUserPipelinesQuery({
      userName,
      pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
      nextPageToken: null,
      accessToken,
    });
    return Promise.resolve(pipelines);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const useUserPipelines = ({
  userName,
  enabled,
  accessToken,
  retry,
}: {
  userName: string;
  enabled: boolean;
  accessToken: Nullable<string>;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery(
    ["pipelines", userName],
    async () => {
      const pipelines = await fetchUserPipelines(userName, accessToken);
      return Promise.resolve(pipelines);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
