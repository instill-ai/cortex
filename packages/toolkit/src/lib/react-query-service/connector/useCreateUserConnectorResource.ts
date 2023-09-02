import { useMutation } from "@tanstack/react-query";
import type { Nullable } from "../../type";
import {
  createUserConnectorResourceMutation,
  CreateUserConnectorResourcePayload,
} from "../../vdp-sdk";
import { onSuccessAfterConnectResourceMutation } from "./onSuccessAfterConnectResourceMutation";

export const useCreateUserConnectorResource = () => {
  return useMutation(
    async ({
      userName,
      payload,
      accessToken,
    }: {
      userName: string;
      payload: CreateUserConnectorResourcePayload;
      accessToken: Nullable<string>;
    }) => {
      const connectorResource = await createUserConnectorResourceMutation({
        userName,
        payload,
        accessToken,
      });
      return Promise.resolve({ connectorResource, accessToken });
    },
    {
      onSuccess: async ({ connectorResource, accessToken }) => {
        onSuccessAfterConnectResourceMutation({
          type: "create",
          connectorResource,
          accessToken,
        });
      },
    }
  );
};
