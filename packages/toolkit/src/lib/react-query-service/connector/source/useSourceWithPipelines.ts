import { useQuery } from "@tanstack/react-query";

import { SourceWithPipelines } from "../../../vdp-sdk";
import { usePipelines } from "../../pipeline";
import { Nullable } from "../../../type";
import { useSource } from "./useSource";

export const useSourceWithPipelines = ({
  sourceName,
  accessToken,
  enabled,
  retry,
}: {
  sourceName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  const pipelines = usePipelines({ enabled, accessToken, retry });
  const source = useSource({ enabled, sourceName, accessToken, retry });

  let enableQuery = false;

  if (sourceName && source.isSuccess && pipelines.isSuccess && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["sources", sourceName, "with-pipelines"],
    async () => {
      if (!sourceName) {
        return Promise.reject(new Error("invalid source name"));
      }

      if (!source.data) {
        return Promise.reject(new Error("invalid source data"));
      }

      if (!pipelines.data) {
        return Promise.reject(new Error("invalid pipeline data"));
      }

      const targetPipelines = pipelines.data.filter(
        (e) => e.recipe.source.name === sourceName
      );

      const sourceWithPipelines: SourceWithPipelines = {
        ...source.data,
        pipelines: targetPipelines,
      };

      return Promise.resolve(sourceWithPipelines);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
