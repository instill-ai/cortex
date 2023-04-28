import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../../type";
import {
  deleteSourceMutation,
  type ConnectorsWatchState,
  type SourceWithDefinition,
} from "../../../vdp-sdk";
import { removeObjKey } from "../../../utility";

export const useDeleteSource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      sourceName,
      accessToken,
    }: {
      sourceName: string;
      accessToken: Nullable<string>;
    }) => {
      await deleteSourceMutation({ sourceName, accessToken });
      return Promise.resolve(sourceName);
    },
    {
      onSuccess: (sourceName) => {
        queryClient.removeQueries(["sources", sourceName], {
          exact: true,
        });

        queryClient.setQueryData<SourceWithDefinition[]>(["sources"], (old) => {
          return old ? old.filter((e) => e.name !== sourceName) : [];
        });

        // Deal with destinations with pipelines cache
        queryClient.setQueryData<SourceWithDefinition[]>(
          ["sources", "with-pipelines"],
          (old) => (old ? old.filter((e) => e.name !== sourceName) : [])
        );

        queryClient.removeQueries(["sources", sourceName, "with-pipelines"], {
          exact: true,
        });

        // Process watch state
        queryClient.removeQueries(["sources", sourceName, "watch"], {
          exact: true,
        });

        queryClient.setQueryData<ConnectorsWatchState>(
          ["sources", "watch"],
          (old) => {
            return old ? removeObjKey(old, sourceName) : {};
          }
        );
      },
    }
  );
};
