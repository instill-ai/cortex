import { useMutation } from "@tanstack/react-query";
import type { Nullable } from "../../type";
import { undeployUserModeleAction } from "../../vdp-sdk";
import { onSuccessAfterModelMutation } from "./onSuccessAfterModelMutation";

export const useUndeployUserModel = () => {
  return useMutation(
    async ({
      modelName,
      accessToken,
    }: {
      modelName: string;
      accessToken: Nullable<string>;
    }) => {
      const operation = await undeployUserModeleAction({
        modelName,
        accessToken,
      });

      return Promise.resolve({ modelName, operation, accessToken });
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
