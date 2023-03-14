import { testModelInstance, TestModelInstancePayload } from "../../vdp-sdk";
import { useMutation } from "@tanstack/react-query";
import { Nullable } from "../../type";

export const useTestModelInstance = () => {
  return useMutation(
    async ({
      payload,
      accessToken,
    }: {
      payload: TestModelInstancePayload;
      accessToken: Nullable<string>;
    }) => {
      const result = await testModelInstance({ payload, accessToken });
      return result;
    }
  );
};
