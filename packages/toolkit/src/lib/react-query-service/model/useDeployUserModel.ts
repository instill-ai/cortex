import { useMutation } from "@tanstack/react-query";
import type { Nullable } from "../../type";
import { deployUserModelAction } from "../../vdp-sdk";
import { onSuccessAfterModelMutation } from "./onSuccessAfterModelMutation";

export const useDeployUserModel = () => {
  return useMutation(
    async ({
      modelName,
      accessToken,
    }: {
      modelName: string;
      accessToken: Nullable<string>;
    }) => {
      try {
        await deployUserModelAction({
          modelName,
          accessToken,
        });

        return Promise.resolve({ modelName, accessToken });
      } catch (err) {
        return Promise.reject(err);
      }
    },
    {
      onSuccess: async ({ modelName, accessToken }) => {
        await onSuccessAfterModelMutation({
          type: "deploy",
          modelName,
          accessToken,
        });
      },
    }
  );
};
