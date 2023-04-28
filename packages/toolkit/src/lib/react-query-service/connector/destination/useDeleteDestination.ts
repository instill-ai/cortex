import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteDestinationMutation,
  type ConnectorsWatchState,
  type DestinationWithDefinition,
  DestinationWithPipelines,
} from "../../../vdp-sdk";
import { env, removeObjKey } from "../../../utility";
import { Nullable } from "../../../type";

export const useDeleteDestination = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      accessToken,
      destinationName,
    }: {
      accessToken: Nullable<string>;
      destinationName: string;
    }) => {
      if (env("NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH") && !accessToken) {
        throw new Error(
          "You had set NEXT_PUBLIC_ENABLE_INSTILL_API_AUTH=true but didn't provide necessary access token"
        );
      }
      await deleteDestinationMutation({ destinationName, accessToken });
      return Promise.resolve(destinationName);
    },
    {
      onSuccess: (destinationName) => {
        queryClient.removeQueries(["destinations", destinationName], {
          exact: true,
        });

        queryClient.setQueryData<DestinationWithDefinition[]>(
          ["destinations"],
          (old) => {
            return old ? old.filter((e) => e.name !== destinationName) : [];
          }
        );

        // Deal with destinations with pipelines cache
        queryClient.setQueryData<DestinationWithPipelines[]>(
          ["destinations", "with-pipelines"],
          (old) => (old ? old.filter((e) => e.name !== destinationName) : [])
        );

        queryClient.removeQueries(
          ["destinations", destinationName, "with-pipelines"],
          {
            exact: true,
          }
        );

        // Process watch state
        queryClient.removeQueries(["destinations", destinationName, "watch"], {
          exact: true,
        });

        queryClient.setQueryData<ConnectorsWatchState>(
          ["destinations", "watch"],
          (old) => {
            return old ? removeObjKey(old, destinationName) : {};
          }
        );
      },
    }
  );
};
