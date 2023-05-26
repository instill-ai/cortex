import { useQuery } from "@tanstack/react-query";
import { env } from "../../utility";
import { listModelsQuery } from "../../vdp-sdk";
import type { Nullable } from "../../type";

export async function fetchModels(accessToken: Nullable<string>) {
  try {
    const models = await listModelsQuery({
      pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
      nextPageToken: null,
      accessToken,
    });
    return Promise.resolve(models);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const useModels = ({
  accessToken,
  enabled,
  retry,
}: {
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  return useQuery(
    ["models"],
    async () => {
      const models = await fetchModels(accessToken);
      return Promise.resolve(models);
    },
    {
      enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
