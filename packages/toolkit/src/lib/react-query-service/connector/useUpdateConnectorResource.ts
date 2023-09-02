import { useMutation } from "@tanstack/react-query";
import {
  updateUserConnectorResourceMutation,
  UpdateUserConnectorResourcePayload,
} from "../../vdp-sdk";
import { Nullable } from "../../type";
import { onSuccessAfterConnectResourceMutation } from "./onSuccessAfterConnectResourceMutation";

export const useUpdateUserConnectorResource = () => {
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: UpdateUserConnectorResourcePayload;
      accessToken: Nullable<string>;
    }) => {
      const connectorResource = await updateUserConnectorResourceMutation({
        payload,
        accessToken,
      });
      return Promise.resolve({ connectorResource, accessToken });
    },
    {
      onSuccess: async ({ connectorResource, accessToken }) => {
        await onSuccessAfterConnectResourceMutation({
          type: "update",
          connectorResource,
          accessToken,
        });
      },
    }
  );
};
