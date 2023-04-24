import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { watchPipeline, type PipelinesWatchState } from "../../vdp-sdk";

export function useWatchPipelines({
  pipelineNames,
  accessToken,
  enabled,
  retry,
}: {
  pipelineNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) {
  let enableQuery = false;

  if (pipelineNames && enabled && pipelineNames.length > 0) {
    enableQuery = true;
  }

  return useQuery(
    ["pipelines", "watch"],
    async () => {
      if (!pipelineNames || pipelineNames.length === 0) {
        return Promise.reject(new Error("Pipeline names not provided"));
      }

      let watches: PipelinesWatchState = {};

      for (const pipelineName of pipelineNames) {
        const watch = await watchPipeline({
          pipelineName,
          accessToken,
        });
        watches[pipelineName] = watch;
      }

      return Promise.resolve(watches);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
}
