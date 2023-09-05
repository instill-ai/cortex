import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Nullable } from "../../type";
import { onSuccessAfterConnectResourceMutation } from "./onSuccessAfterConnectResourceMutation";
import { disconnectUserConnectorResourceAction } from "../../vdp-sdk";

export const useDisonnectConnectorResource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      connectorResourceName,
      accessToken,
    }: {
      connectorResourceName: string;
      accessToken: Nullable<string>;
    }) => {
      const connectorResource = await disconnectUserConnectorResourceAction({
        connectorResourceName: connectorResourceName,
        accessToken,
      });

      return Promise.resolve({ connectorResource, accessToken });
    },
    {
      onSuccess: async ({ connectorResource, accessToken }) => {
        await onSuccessAfterConnectResourceMutation({
          type: "disconnect",
          queryClient,
          connectorResource,
          accessToken,
        });
      },
    }
  );
};
