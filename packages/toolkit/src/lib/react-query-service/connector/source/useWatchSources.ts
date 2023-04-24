import { useQuery } from "@tanstack/react-query";
import type { Nullable } from "../../../type";
import { watchSource, type ConnectorsWatchState } from "../../../vdp-sdk";

export function useWatchSources({
  sourceNames,
  accessToken,
  enabled,
  retry,
}: {
  sourceNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enabled: boolean;
  retry?: number;
}) {
  let enableQuery = false;

  if (sourceNames && enabled && sourceNames.length > 0) {
    enableQuery = true;
  }

  return useQuery(
    ["sources", "watch"],
    async () => {
      if (!sourceNames || sourceNames.length === 0) {
        return Promise.reject(new Error("Source names not provided"));
      }

      let watches: ConnectorsWatchState = {};

      for (const sourceName of sourceNames) {
        const watch = await watchSource({
          sourceName,
          accessToken,
        });
        watches[sourceName] = watch;
      }

      return Promise.resolve(watches);
    },
    {
      enabled: enableQuery,
      retry: retry ? retry : 3,
    }
  );
}
