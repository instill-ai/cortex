import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeObjKey } from "../../utility";
import { Nullable } from "../../type";
import {
  deleteUserConnectorResourceMutation,
  getUserConnectorResourceQuery,
} from "../../vdp-sdk";
import { onSuccessAfterConnectResourceMutation } from "./onSuccessAfterConnectResourceMutation";

export const useDeleteConnectorResource = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      accessToken,
      connectorResourceName,
    }: {
      accessToken: Nullable<string>;
      connectorResourceName: string;
    }) => {
      await deleteUserConnectorResourceMutation({
        connectorResourceName,
        accessToken,
      });
      return Promise.resolve({ connectorResourceName, accessToken });
    },
    {
      onSuccess: async ({ connectorResourceName, accessToken }) => {
        await onSuccessAfterConnectResourceMutation({
          type: "delete",
          connectorResourceName,
          accessToken,
        });
      },
    }
  );
};
