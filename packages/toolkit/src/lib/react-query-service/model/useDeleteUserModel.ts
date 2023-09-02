import { useMutation } from "@tanstack/react-query";
import { deleteUserModelMutation } from "../../vdp-sdk";
import type { Nullable } from "../../type";
import { onSuccessAfterModelMutation } from "./onSuccessAfterModelMutation";

export const useDeleteModel = () => {
  return useMutation(
    async ({
      modelName,
      accessToken,
    }: {
      modelName: string;
      accessToken: Nullable<string>;
    }) => {
      await deleteUserModelMutation({ modelName, accessToken });
      return Promise.resolve({ modelName, accessToken });
    },
    {
      onSuccess: async ({ modelName, accessToken }) => {
        await onSuccessAfterModelMutation({
          type: "create",
          modelName,
          accessToken,
        });
      },
    }
  );
};
