import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env, removeObjKey } from "../../../utility";
import {
  getDestinationDefinitionQuery,
  updateDestinationMutation,
  watchDestination,
  type ConnectorsWatchState,
  type ConnectorWatchState,
  type DestinationWithDefinition,
  type UpdateDestinationPayload,
} from "../../../vdp-sdk";
import type { Nullable } from "../../../type";

export const useUpdateDestination = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      accessToken,
      payload,
    }: {
      accessToken: Nullable<string>;
      payload: UpdateDestinationPayload;
    }) => {
      if (env("NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH") && !accessToken) {
        throw new Error(
          "You had set NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH=true but didn't provide necessary access token"
        );
      }
      const destination = await updateDestinationMutation({
        payload,
        accessToken,
      });
      return Promise.resolve({ destination, accessToken });
    },
    {
      onSuccess: async ({ destination, accessToken }) => {
        const destinationDefinition = await getDestinationDefinitionQuery({
          destinationDefinitionName:
            destination.destination_connector_definition,
          accessToken,
        });

        const newDestinationWithDefinition: DestinationWithDefinition = {
          ...destination,
          destination_connector_definition: destinationDefinition,
        };

        queryClient.setQueryData<DestinationWithDefinition>(
          ["destinations", destination.name],
          newDestinationWithDefinition
        );

        queryClient.setQueryData<DestinationWithDefinition[]>(
          ["destinations"],
          (old) =>
            old
              ? [
                  ...old.filter((e) => e.name !== destination.name),
                  newDestinationWithDefinition,
                ]
              : [newDestinationWithDefinition]
        );

        // Deal with destinations with pipelines cache
        queryClient.invalidateQueries(["destinations", "with-pipelines"]);
        queryClient.invalidateQueries([
          "destinations",
          newDestinationWithDefinition.name,
          "with-pipelines",
        ]);

        // Process watch state
        const watch = await watchDestination({
          destinationName: newDestinationWithDefinition.name,
          accessToken,
        });

        queryClient.setQueryData<ConnectorWatchState>(
          ["destinations", newDestinationWithDefinition.name, "watch"],
          watch
        );

        queryClient.setQueryData<ConnectorsWatchState>(
          ["destinations", "watch"],
          (old) =>
            old
              ? {
                  ...removeObjKey(old, newDestinationWithDefinition.name),
                  [newDestinationWithDefinition.name]: watch,
                }
              : { [newDestinationWithDefinition.name]: watch }
        );
      },
    }
  );
};
