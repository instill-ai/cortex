import { getModelInstanceReadme } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { useQuery } from "@tanstack/react-query";

export const useModelInstanceReadme = ({
  modelInstanceName,
  accessToken,
}: {
  modelInstanceName: Nullable<string>;
  accessToken: Nullable<string>;
}) => {
  return useQuery(
    [
      "models",
      modelInstanceName?.split("/")[1],
      "modelInstances",
      modelInstanceName,
      "readme",
    ],
    async () => {
      if (!modelInstanceName) {
        return Promise.reject(new Error("Model instance name not provided"));
      }

      const modelInstanceReadme = await getModelInstanceReadme({
        modelInstanceName,
        accessToken,
      });

      return Promise.resolve(window.atob(modelInstanceReadme.content));
    },
    {
      enabled: modelInstanceName ? true : false,
      retry: 3,
    }
  );
};
