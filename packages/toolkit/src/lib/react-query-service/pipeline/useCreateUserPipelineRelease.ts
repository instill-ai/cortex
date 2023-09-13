import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeObjKey } from "../../utility";
import {
  createUserPipelineReleaseMutation,
  watchUserPipelineReleaseQuery,
  type CreateUserPipelinePayload,
  type PipelineRelease,
  type PipelineReleaseWatchState,
  type PipelineReleasesWatchState,
} from "../../vdp-sdk";
import type { Nullable } from "../../type";

export const useCreateUserPipelineRelease = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      pipelineName,
      userName,
      payload,
      accessToken,
    }: {
      pipelineName: string;
      userName: string;
      payload: CreateUserPipelinePayload;
      accessToken: Nullable<string>;
    }) => {
      const pipelineRelease = await createUserPipelineReleaseMutation({
        pipelineName,
        userName,
        payload,
        accessToken,
      });
      return Promise.resolve({ pipelineRelease, accessToken });
    },
    {
      onSuccess: async ({ pipelineRelease, accessToken }) => {
        // At this stage the pipelineName will be
        // users/<uid>/pipelines/<pid>/releases/<version>
        const pipelineNameArray = pipelineRelease.name.split("/");
        const userName = `${pipelineNameArray[0]}/${pipelineNameArray[1]}`;

        queryClient.setQueryData<PipelineRelease>(
          ["pipelineReleases", pipelineRelease.name],
          pipelineRelease
        );

        queryClient.setQueryData<PipelineRelease[]>(
          ["pipelineReleases", userName],
          (old) =>
            old
              ? [
                  ...old.filter((e) => e.name !== pipelineRelease.name),
                  pipelineRelease,
                ]
              : [pipelineRelease]
        );

        // process watch state

        const watch = await watchUserPipelineReleaseQuery({
          pipelineReleaseName: pipelineRelease.name,
          accessToken,
        });

        queryClient.setQueryData<PipelineReleaseWatchState>(
          ["pipelineReleases", pipelineRelease.name, "watch"],
          watch
        );

        queryClient.setQueryData<PipelineReleasesWatchState>(
          ["pipelineReleases", userName, "watch"],
          (old) =>
            old
              ? {
                  ...removeObjKey(old, pipelineRelease.name),
                  [pipelineRelease.name]: watch,
                }
              : { [pipelineRelease.name]: watch }
        );
      },
    }
  );
};
