import { useQuery } from "@tanstack/react-query";
import { getPipelineQuery } from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const usePipeline = ({
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
}) => {
  let enableQuery = false;

  if (pipelineName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["pipelines", pipelineName],
    async () => {
      if (!pipelineName) {
        return Promise.reject(new Error("invalid pipeline name"));
      }
      const pipeline = await getPipelineQuery({ pipelineName, accessToken });
      return Promise.resolve(pipeline);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
