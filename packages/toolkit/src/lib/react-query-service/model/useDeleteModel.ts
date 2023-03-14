import { deleteModelMutation, Model } from "../../vdp-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Nullable } from "../../type";

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
      return modelName;
    },
    {
      onSuccess: (modelName) => {
        const modelId = modelName.split("/")[1];

        queryClient.removeQueries(["models", modelId], { exact: true });

        const models = queryClient.getQueryData<Model[]>(["models"]);

        if (models) {
          queryClient.setQueryData<Model[]>(
            ["models"],
            models.filter((e) => e.name !== modelName)
          );
        }
      },
    }
  );
};
