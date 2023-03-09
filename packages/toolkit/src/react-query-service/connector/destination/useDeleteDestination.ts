import {
  deleteDestinationMutation,
  DestinationWithDefinition,
} from "../../../vdp-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "../../../utility";
import { Nullable } from "../../../type";

export const useDeleteDestination = ({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) => {
  if (env("NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH") === "true" && !accessToken) {
    throw new Error(
      "You had set NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH=true but didn't provide necessary access token"
    );
  }

  const queryClient = useQueryClient();
  return useMutation(
    async (destinationName: string) => {
      await deleteDestinationMutation({ destinationName, accessToken });
      return destinationName;
    },
    {
      onSuccess: (destinationName) => {
        const destinationId = destinationName.split("/")[1];

        queryClient.removeQueries(["destinations", destinationId], {
          exact: true,
        });

        const destinations = queryClient.getQueryData<
          DestinationWithDefinition[]
        >(["destinations"]);

        if (destinations) {
          queryClient.setQueryData<DestinationWithDefinition[]>(
            ["destinations"],
            destinations.filter((e) => e.name !== destinationName)
          );
        }
      },
    }
  );
};
