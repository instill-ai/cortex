import { useQuery } from "@tanstack/react-query";
import { usePipelines } from "../pipeline";
import type { ConnectorWithPipelines } from "../../vdp-sdk";
import type { Nullable } from "../../type";
import { getComponentsFromPipelineRecipe } from "../../utility";
import { useConnector } from "./useConnector";

export const useConnectorWithPipelines = ({
  connectorName,
  accessToken,
  enabled,
  retry,
}: {
  connectorName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  const pipelines = usePipelines({ enabled, accessToken, retry });
  const connector = useConnector({
    enabled,
    connectorName,
    accessToken,
    retry,
  });

  let enableQuery = false;

  if (connectorName && connector.isSuccess && pipelines.isSuccess && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["connectors", connectorName, "with-pipelines"],
    async () => {
      if (!connectorName) {
        return Promise.reject(new Error("Invalid connector name"));
      }

      if (!connector.data) {
        return Promise.reject(new Error("Invalid connector data"));
      }

      if (!pipelines.data) {
        return Promise.reject(new Error("Invalid pipeline data"));
      }

      const targetPipelines = pipelines.data.filter((e) => {
        const components = getComponentsFromPipelineRecipe({
          recipe: e.recipe,
          connectorType: connector.data.connector_type,
        });

        return components.some(
          (e) => e.resource_detail.id === connector.data.id
        );
      });

      const connectorWithPipelines: ConnectorWithPipelines = {
        ...connector.data,
        pipelines: targetPipelines,
      };

      return Promise.resolve(connectorWithPipelines);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
