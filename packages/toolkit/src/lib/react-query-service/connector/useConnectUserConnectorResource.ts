import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectUserConnectorResourceAction } from "../../vdp-sdk";
import type { Nullable } from "../../type";
import { onSuccessAfterConnectResourceMutation } from "./onSuccessAfterConnectResourceMutation";

export const useConnectConnectorResource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      connectorResourceName,
      accessToken,
    }: {
      connectorResourceName: string;
      accessToken: Nullable<string>;
    }) => {
      const connectorResource = await connectUserConnectorResourceAction({
        connectorResourceName,
        accessToken,
      });

      return Promise.resolve({ connectorResource, accessToken });
    },
    {
      onSuccess: async ({ connectorResource, accessToken }) => {
        await onSuccessAfterConnectResourceMutation({
          type: "connect",
          queryClient,
          connectorResource,
          accessToken,
        });
      },
    }
  );
};
