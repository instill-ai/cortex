import { useQuery } from "@tanstack/react-query";
import {
  getDestinationDefinitionQuery,
  getDestinationQuery,
  type DestinationWithDefinition,
} from "../../../vdp-sdk";
import { Nullable } from "../../../type";
import { env } from "../../../utility";

export const useDestination = ({
  destinationName,
  accessToken,
  enabled,
  retry,
}: {
  destinationName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  if (env("NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH") && !accessToken) {
    throw new Error(
      "You had set NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH=true but didn't provide necessary access token"
    );
  }

  let enableQuery = false;

  if (enabled && destinationName) {
    enableQuery = true;
  }

  return useQuery(
    ["destinations", destinationName],
    async () => {
      if (!destinationName) {
        return Promise.reject(new Error("invalid destination name"));
      }

      const destination = await getDestinationQuery({
        destinationName,
        accessToken,
      });

      const destinationDefinition = await getDestinationDefinitionQuery({
        destinationDefinitionName: destination.destination_connector_definition,
        accessToken,
      });

      const destinationWithDefinition: DestinationWithDefinition = {
        ...destination,
        destination_connector_definition: destinationDefinition,
      };

      return Promise.resolve(destinationWithDefinition);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
