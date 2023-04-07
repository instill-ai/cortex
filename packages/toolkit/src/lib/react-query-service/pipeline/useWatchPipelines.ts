import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { watchPipeline, WatchPipelinesState } from "../../vdp-sdk";

export function useWatchPipelines({
  pipelineNames,
  accessToken,
  enable,
}: {
  pipelineNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enable: boolean;
}) {
  let enableQuery = false;

  if (pipelineNames && enable && pipelineNames.length > 0) {
    enableQuery = true;
  }

  return useQuery(
    ["pipelines", "watch"],
    async () => {
      if (!pipelineNames || pipelineNames.length === 0) {
        return Promise.reject(new Error("Pipeline names not provided"));
      }

      let watches: WatchPipelinesState = {};

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
      retry: 3,
      enabled: enableQuery,
    }
  );
}
