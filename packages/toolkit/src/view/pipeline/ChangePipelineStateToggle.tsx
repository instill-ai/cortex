import cn from "clsx";
import axios from "axios";
import { FC, useState, useEffect, useCallback } from "react";
import { StatefulToggleField } from "@instill-ai/design-system";
import { UseMutationResult } from "@tanstack/react-query";

import type { Pipeline, Nullable } from "../../lib";

export type ChangePipelineStateToggleProps = {
  pipeline: Nullable<Pipeline>;
  switchOff: UseMutationResult<
    Pipeline,
    unknown,
    {
      pipelineName: string;
      accessToken: Nullable<string>;
    },
    unknown
  >;
  switchOn: UseMutationResult<
    Pipeline,
    unknown,
    {
      pipelineName: string;
      accessToken: Nullable<string>;
    },
    unknown
  >;
  marginBottom?: string;
  accessToken: Nullable<string>;
};

export const ChangePipelineStateToggle: FC<ChangePipelineStateToggleProps> = ({
  pipeline,
  switchOn,
  switchOff,
  marginBottom,
  accessToken,
}) => {
  const [error, setError] = useState<Nullable<string>>(null);

  useEffect(() => {
    setError(null);
  }, [pipeline]);

  const changePipelineStateHandler = useCallback(() => {
    if (!pipeline || pipeline.state === "STATE_UNSPECIFIED") return;

    if (pipeline.state === "STATE_ACTIVE") {
      switchOff.mutate(
        {
          pipelineName: pipeline.name,
          accessToken,
        },
        {
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              setError(
                error.response?.data.message ??
                  "There is an error. Please try again."
              );
            } else {
              setError("There is an error. Please try again.");
            }
          },
        }
      );
    } else {
      switchOn.mutate(
        {
          pipelineName: pipeline.name,
          accessToken,
        },
        {
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              setError(
                error.response?.data.message ??
                  "There is an error. Please try again."
              );
            } else {
              setError("There is an error. Please try again.");
            }
          },
        }
      );
    }
  }, [switchOn, switchOff, pipeline, accessToken]);

  return (
    <div className={cn("flex flex-row", marginBottom)}>
      <StatefulToggleField
        id="changePipelineStateToggle"
        value={pipeline?.state === "STATE_ACTIVE" ? true : false}
        onChange={changePipelineStateHandler}
        label="State"
        error={error}
        state={
          pipeline?.state === "STATE_UNSPECIFIED"
            ? "STATE_LOADING"
            : pipeline?.state || "STATE_UNSPECIFIED"
        }
        disabled={pipeline?.state === "STATE_UNSPECIFIED"}
        loadingLabelText="Pipeline is in the long running operation, please refresh this page to get the new status"
      />
    </div>
  );
};
