import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { Model, updateModelMutation, UpdateModelPayload } from "../../vdp-sdk";

export const useUpdateModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: UpdateModelPayload;
      accessToken: Nullable<string>;
    }) => {
      const model = await updateModelMutation({ payload, accessToken });
      return Promise.resolve(model);
    },
    {
      onSuccess: (newModel) => {
        queryClient.setQueryData<Model>(["models", newModel.name], newModel);
        queryClient.setQueryData<Model[]>(["models"], (old) => {
          if (!old) {
            return [newModel];
          }

          return [...old.filter((e) => e.id !== newModel.id), newModel];
        });
      },
    }
  );
};
