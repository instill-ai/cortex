import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { watchSource } from "../../../vdp-sdk";

export function useWatchSource({
  sourceName,
  accessToken,
  enabled,
  retry,
}: {
  sourceName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  retry?: number;
}) {
  let enableQuery = false;

  if (sourceName && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["sources", sourceName, "watch"],
    async () => {
      if (!sourceName) {
        return Promise.reject(new Error("Source name not provided"));
      }

      const watch = await watchSource({
        sourceName,
        accessToken,
      });

      return Promise.resolve(watch);
    },
    {
      enabled: enableQuery,
      retry: retry ? retry : 3,
    }
  );
}
