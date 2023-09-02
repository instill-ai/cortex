import { useMutation } from "@tanstack/react-query";
import { CreateUserModelPayload, createUserModelMutation } from "../../vdp-sdk";
import type { Nullable } from "../../type";
import { onSuccessAfterModelMutation } from "./onSuccessAfterModelMutation";

export const useCreateUserModel = () => {
  return useMutation(
    async ({
      userName,
      payload,
      accessToken,
    }: {
      userName: string;
      payload: CreateUserModelPayload;
      accessToken: Nullable<string>;
    }) => {
      const operation = await createUserModelMutation({
        userName,
        payload,
        accessToken,
      });
      return Promise.resolve({
        operation,
        accessToken,
        modelName: `${userName}/models/${payload.id}`,
      });
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
