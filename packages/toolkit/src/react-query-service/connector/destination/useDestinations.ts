import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { env } from "../../../utility";
import {
  DestinationWithDefinition,
  getDestinationDefinitionQuery,
  listDestinationsQuery,
} from "../../../vdp-sdk";

export const useDestinations = ({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) => {
  return useQuery(
    ["destinations"],
    async () => {
      const destinations = await listDestinationsQuery({
        pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
        nextPageToken: null,
        accessToken,
      });

      const destinationsWithDefinition: DestinationWithDefinition[] = [];

      for (const destination of destinations) {
        const destinationDefinition = await getDestinationDefinitionQuery({
          destinationDefinitionName:
            destination.destination_connector_definition,
          accessToken,
        });

        destinationsWithDefinition.push({
          ...destination,
          destination_connector_definition: destinationDefinition,
        });
      }

      return Promise.resolve(destinationsWithDefinition);
    },
    {
      retry: 3,
    }
  );
};
