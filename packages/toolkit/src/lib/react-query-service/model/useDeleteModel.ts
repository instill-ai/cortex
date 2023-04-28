import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeObjKey } from "../../utility/removeObjKey";
import {
  deleteModelMutation,
  type ConnectorsWatchState,
  type Model,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useDeleteModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      modelName,
      accessToken,
    }: {
      modelName: string;
      accessToken: Nullable<string>;
    }) => {
      await deleteModelMutation({ modelName, accessToken });
      return Promise.resolve(modelName);
    },
    {
      onSuccess: (modelName) => {
        queryClient.removeQueries(["models", modelName], { exact: true });
        queryClient.setQueryData<Model[]>(["models"], (old) =>
          old ? old.filter((e) => e.name !== modelName) : []
        );

        queryClient.removeQueries(["models", modelName, "readme"], {
          exact: true,
        });

        // Process watch state
        queryClient.removeQueries(["models", modelName, "watch"], {
          exact: true,
        });

        queryClient.setQueryData<ConnectorsWatchState>(
          ["models", "watch"],
          (old) => {
            return old ? removeObjKey(old, modelName) : {};
          }
        );
      },
    }
  );
};
