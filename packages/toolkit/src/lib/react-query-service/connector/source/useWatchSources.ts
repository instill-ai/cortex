import { useQuery } from "@tanstack/react-query";
import type { Nullable } from "../../../type";
import { watchSource, type ConnectorsWatchState } from "../../../vdp-sdk";

export function useWatchSources({
  sourceNames,
  accessToken,
  enable,
}: {
  sourceNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enable: boolean;
}) {
  let enableQuery = false;

  if (sourceNames && enable && sourceNames.length > 0) {
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
      retry: 3,
      enabled: enableQuery,
    }
  );
}
