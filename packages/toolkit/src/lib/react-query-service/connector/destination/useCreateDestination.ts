import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import { env, removeObjKey } from "../../../utility";
import {
  createDestinationMutation,
  CreateDestinationPayload,
  getDestinationDefinitionQuery,
  watchDestination,
  type ConnectorsWatchState,
  type ConnectorWatchState,
  type DestinationWithDefinition,
} from "../../../vdp-sdk";

export const useCreateDestination = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      accessToken,
      payload,
    }: {
      accessToken: Nullable<string>;
      payload: CreateDestinationPayload;
    }) => {
      if (env("NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH") && !accessToken) {
        throw new Error(
          "You had set NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH=true but didn't provide necessary access token"
        );
      }
      const res = await createDestinationMutation({ payload, accessToken });
      return Promise.resolve({ newDestination: res, accessToken });
    },
    {
      onSuccess: async ({ newDestination, accessToken }) => {
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
                  ...old.filter((e) => e.name !== newDestination.name),
                  newDestinationWithDefinition,
                ]
              : [newDestinationWithDefinition]
        );

        // Invalidate destination with pipeline cache
        queryClient.invalidateQueries(["destinations", "with-pipelines"]);

        // Process watch state
        const watch = await watchDestination({
          destinationName: newDestination.name,
          accessToken,
        });

        queryClient.setQueryData<ConnectorWatchState>(
          ["destinations", newDestination.name, "watch"],
          watch
        );

        queryClient.setQueryData<ConnectorsWatchState>(
          ["destinations", "watch"],
          (old) =>
            old
              ? {
                  ...removeObjKey(old, newDestination.name),
                  [newDestination.name]: watch,
                }
              : { [newDestination.name]: watch }
        );
      },
    }
  );
};
