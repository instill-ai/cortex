import { useQuery } from "@tanstack/react-query";
import {
  DestinationWithDefinition,
  getDestinationDefinitionQuery,
  getDestinationQuery,
} from "../../../vdp-sdk";
import { Nullable } from "../../../type";
import { env } from "../../../utility";

export const useDestination = ({
  destinationName,
  accessToken,
  enable,
}: {
  destinationName: Nullable<string>;
  accessToken: Nullable<string>;
  enable: boolean;
}) => {
  if (env("NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH") === "true" && !accessToken) {
    throw new Error(
      "You had set NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH=true but didn't provide necessary access token"
    );
  }

  let enableQuery = false;

  if (enable && destinationName) {
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
      retry: 3,
    }
  );
};
