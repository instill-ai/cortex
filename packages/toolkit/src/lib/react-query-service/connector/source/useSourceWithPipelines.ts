import { useQuery } from "@tanstack/react-query";

import { SourceWithPipelines } from "../../../vdp-sdk";
import { usePipelines } from "../../pipeline";
import { Nullable } from "../../../type";
import { useSource } from "./useSource";

export const useSourceWithPipelines = ({
  sourceName,
  accessToken,
  enable,
}: {
  sourceName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  const pipelines = usePipelines({ enable, accessToken });
  const source = useSource({ sourceName, accessToken, enable });

  let enableQuery = false;

  if (sourceName && source.isSuccess && pipelines.isSuccess && enable) {
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
      retry: 3,
    }
  );
};
