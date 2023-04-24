import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { watchPipeline } from "../../vdp-sdk";

export function useWatchPipeline({
  pipelineName,
  accessToken,
  enabled,
  retry,
}: {
  pipelineName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) {
  let enableQuery = false;

  if (pipelineName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["pipelines", pipelineName, "watch"],
    async () => {
      if (!pipelineName) {
        return Promise.reject(new Error("Pipeline name not provided"));
      }

      const watch = await watchPipeline({
        pipelineName,
        accessToken,
      });

      return Promise.resolve(watch);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
}
