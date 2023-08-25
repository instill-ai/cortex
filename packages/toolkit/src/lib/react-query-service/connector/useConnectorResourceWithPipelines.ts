import { useQuery } from "@tanstack/react-query";
import { usePipelines } from "../pipeline";
import type { ConnectorResourceWithPipelines } from "../../vdp-sdk";
import type { Nullable } from "../../type";
import { getComponentsFromPipelineRecipe } from "../../utility";
import { useConnectorResource } from "./useConnectorResource";

export const useConnectorResourceWithPipelines = ({
  connectorResourceName,
  accessToken,
  enabled,
  retry,
}: {
  connectorResourceName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  const pipelines = usePipelines({ enabled, accessToken, retry });
  const connectorResource = useConnectorResource({
    enabled,
    connectorResourceName,
    accessToken,
    retry,
  });

  let enableQuery = false;

  if (
    connectorResourceName &&
    connectorResource.isSuccess &&
    pipelines.isSuccess &&
    enabled
  ) {
    enableQuery = true;
  }

  return useQuery(
    ["connector-resources", connectorResourceName, "with-pipelines"],
    async () => {
      if (!connectorResourceName) {
        return Promise.reject(new Error("Invalid connector resource name"));
      }

      if (!connectorResource.data) {
        return Promise.reject(new Error("Invalid connector resource data"));
      }

      if (!pipelines.data) {
        return Promise.reject(new Error("Invalid pipeline data"));
      }

      const targetPipelines = pipelines.data.filter((e) => {
        const components = getComponentsFromPipelineRecipe({
          recipe: e.recipe,
          connectorResourceType: connectorResource.data.connector_type,
        });

        return components.some(
          (e) => e.resource_detail.id === connectorResource.data.id
        );
      });

      const connectorResourceWithPipelines: ConnectorResourceWithPipelines = {
        ...connectorResource.data,
        pipelines: targetPipelines,
      };

      return Promise.resolve(connectorResourceWithPipelines);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
