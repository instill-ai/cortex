import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { watchPipeline } from "../../vdp-sdk";

export function useWatchPipeline({
  pipelineName,
  accessToken,
  enable,
}: {
  pipelineName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) {
  let enableQuery = false;

  if (pipelineName && enable) {
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
      retry: 3,
      enabled: enableQuery,
    }
  );
}
