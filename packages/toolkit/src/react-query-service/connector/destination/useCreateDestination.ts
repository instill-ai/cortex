import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../../type";

import { env } from "../../../utility";
import {
  createDestinationMutation,
  CreateDestinationPayload,
  DestinationWithDefinition,
  getDestinationDefinitionQuery,
} from "../../../vdp-sdk";

export const useCreateDestination = ({
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
    async (payload: CreateDestinationPayload) => {
      const res = await createDestinationMutation({ payload, accessToken });
      return Promise.resolve(res);
    },
    {
      onSuccess: async (newDestination) => {
        const destinationDefinition = await getDestinationDefinitionQuery({
          destinationDefinitionName:
            newDestination.destination_connector_definition,
          accessToken,
        });

        const newDestinationWithDefinition: DestinationWithDefinition = {
          ...newDestination,
          destination_connector_definition: destinationDefinition,
        };

        queryClient.setQueryData<DestinationWithDefinition>(
          ["destinations", newDestination.id],
          newDestinationWithDefinition
        );

        queryClient.setQueryData<DestinationWithDefinition[]>(
          ["destinations"],
          (old) =>
            old
              ? [
                  ...old.filter((e) => e.id !== newDestination.id),
                  newDestinationWithDefinition,
                ]
              : [newDestinationWithDefinition]
        );
      },
    }
  );
};
