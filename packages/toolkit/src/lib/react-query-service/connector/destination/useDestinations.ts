import { useQuery } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { env } from "../../../utility";
import {
  getDestinationDefinitionQuery,
  listDestinationsQuery,
  type DestinationWithDefinition,
} from "../../../vdp-sdk";

export async function fetchDestinations(accessToken: Nullable<string>) {
  try {
    const destinations = await listDestinationsQuery({
      pageSize: env("NEXT_PUBLIC_QUERY_PAGE_SIZE"),
      nextPageToken: null,
      accessToken,
    });

    const destinationsWithDefinition: DestinationWithDefinition[] = [];

    for (const destination of destinations) {
      const destinationDefinition = await getDestinationDefinitionQuery({
        destinationDefinitionName: destination.destination_connector_definition,
        accessToken,
      });

      destinationsWithDefinition.push({
        ...destination,
        destination_connector_definition: destinationDefinition,
      });
    }

    return Promise.resolve(destinationsWithDefinition);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const useDestinations = ({
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
    ["destinations"],
    async () => {
      const destinations = await fetchDestinations(accessToken);
      return Promise.resolve(destinations);
    },
    {
      enabled: enabled,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};
