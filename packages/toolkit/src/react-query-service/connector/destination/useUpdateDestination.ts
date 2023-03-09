import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import {
  DestinationWithDefinition,
  getDestinationDefinitionQuery,
  updateDestinationMutation,
  UpdateDestinationPayload,
} from "../../../vdp-sdk";

export const useUpdateDestination = ({
  accessToken,
}: {
  accessToken: Nullable<string>;
}) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: UpdateDestinationPayload) => {
      const res = await updateDestinationMutation({ payload, accessToken });
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
