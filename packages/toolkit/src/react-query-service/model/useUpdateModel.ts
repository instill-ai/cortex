import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Model, updateModelMutation, UpdateModelPayload } from "../../vdp-sdk";

export const useUpdateModel = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: UpdateModelPayload) => {
      const model = await updateModelMutation(payload);
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
