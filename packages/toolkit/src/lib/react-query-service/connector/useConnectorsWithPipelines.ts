import { useQuery } from "@tanstack/react-query";
import { usePipelines } from "../pipeline";
import { useConnectors } from "./useConnectors";
import type { Nullable } from "../../type";
import type { ConnectorType, ConnectorWithPipelines } from "../../vdp-sdk";
import { getComponentFromPipelineRecipe } from "../../utility";

export const useConnectorsWithPipelines = ({
  connectorType,
  accessToken,
  enabled,
  retry,
}: {
  connectorType: ConnectorType;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  const connectors = useConnectors({
    connectorType,
    accessToken,
    enabled,
    retry,
  });

  const pipelines = usePipelines({ accessToken, enabled, retry });

  let enableQuery = false;

  if (connectors.isSuccess && pipelines.isSuccess && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["connectors", connectorType, "with-pipelines"],
    async () => {
      if (!connectors.data || !pipelines.data) return [];

      const connectorsWithPipelines: ConnectorWithPipelines[] = [];

      for (const connector of connectors.data) {
        const targetPipelines = pipelines.data.filter(
          (e) =>
            getComponentFromPipelineRecipe({
              recipe: e.recipe,
              componentName: "source",
            })?.resource_detail.id === connector.id
        );
        connectorsWithPipelines.push({
          ...connector,
          pipelines: targetPipelines,
        });
      }

      return connectorsWithPipelines;
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
