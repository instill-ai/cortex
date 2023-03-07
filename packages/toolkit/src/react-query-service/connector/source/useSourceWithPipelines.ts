import { useQuery } from "@tanstack/react-query";

import { SourceWithPipelines } from "../../../vdp-sdk";
import { usePipelines } from "../../pipeline";
import { Nullable } from "../../../type";
import { useSource } from "./useSource";

export const useSourceWithPipelines = (sourceName: Nullable<string>) => {
  const pipelines = usePipelines(true);
  const source = useSource(sourceName);
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
      enabled: sourceName
        ? source.isSuccess
          ? pipelines.isSuccess
            ? true
            : false
          : false
        : false,
      retry: 3,
    }
  );
};
