import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { watchSource } from "../../../vdp-sdk";

export function useWatchSource({
  sourceName,
  accessToken,
  enable,
}: {
  sourceName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) {
  let enableQuery = false;

  if (sourceName && enable) {
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
      retry: 3,
      enabled: enableQuery,
    }
  );
}
