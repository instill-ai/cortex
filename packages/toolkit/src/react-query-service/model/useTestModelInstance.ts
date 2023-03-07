import { testModelInstance, TestModelInstancePayload } from "../../vdp-sdk";
import { useMutation } from "@tanstack/react-query";

export const useTestModelInstance = () => {
  return useMutation(async (payload: TestModelInstancePayload) => {
    const result = await testModelInstance(payload);
    return result;
  });
};
