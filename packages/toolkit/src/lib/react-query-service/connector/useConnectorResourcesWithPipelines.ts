import { useQuery } from "@tanstack/react-query";
import { usePipelines } from "../pipeline";
import { useConnectorResources } from "./useConnectorResources";
import type { Nullable } from "../../type";
import type {
  ConnectorResourceType,
  ConnectorResourceWithPipelines,
} from "../../vdp-sdk";
import { getComponentsFromPipelineRecipe } from "../../utility";

export const useConnectorResourcesWithPipelines = ({
  connectorResourceType,
  accessToken,
  enabled,
  retry,
}: {
  connectorResourceType: ConnectorResourceType;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  const connectorResources = useConnectorResources({
    connectorResourceType,
    accessToken,
    enabled,
    retry,
  });

  const pipelines = usePipelines({ accessToken, enabled, retry });

  let enableQuery = false;

  if (connectorResources.isSuccess && pipelines.isSuccess && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["connector-resources", connectorResourceType, "with-pipelines"],
    async () => {
      if (!connectorResources.data || !pipelines.data) return [];

      const connectorResourcesWithPipelines: ConnectorResourceWithPipelines[] =
        [];

      for (const connectorResource of connectorResources.data) {
        const targetPipelines = pipelines.data.filter((e) => {
          const components = getComponentsFromPipelineRecipe({
            recipe: e.recipe,
            connectorType: connectorResource.connector_type,
          });

          return components.some(
            (e) => e.resource_detail.id === connectorResource.id
          );
        });
        connectorResourcesWithPipelines.push({
          ...connectorResource,
          pipelines: targetPipelines,
        });
      }

      return connectorResourcesWithPipelines;
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
