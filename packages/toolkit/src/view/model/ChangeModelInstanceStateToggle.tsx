import cn from "clsx";
import axios from "axios";
import { StatefulToggleField } from "@instill-ai/design-system";
import { FC, useState, useEffect, useCallback } from "react";
import { UseMutationResult } from "@tanstack/react-query";

import { ModelInstance, Nullable, Operation } from "../../lib";

export type ChangeResourceStateButtonProps = {
  modelInstance: Nullable<ModelInstance>;
  switchOff: UseMutationResult<
    { modelInstance: ModelInstance; operation: Operation },
    unknown,
    {
      modelInstanceName: string;
      accessToken: Nullable<string>;
    },
    unknown
  >;
  switchOn: UseMutationResult<
    { modelInstance: ModelInstance; operation: Operation },
    unknown,
    {
      modelInstanceName: string;
      accessToken: Nullable<string>;
    },
    unknown
  >;
  marginBottom?: string;
  accessToken: Nullable<string>;
};

export const ChangeResourceStateButton: FC<ChangeResourceStateButtonProps> = ({
  modelInstance,
  switchOn,
  switchOff,
  marginBottom,
  accessToken,
}) => {
  const [error, setError] = useState<Nullable<string>>(null);

  useEffect(() => {
    setError(null);
  }, [modelInstance]);

  const changeModelInstanceStateHandler = useCallback(() => {
    if (!modelInstance || modelInstance.state === "STATE_UNSPECIFIED") return;

    if (modelInstance.state === "STATE_ONLINE") {
      switchOff.mutate(
        {
          modelInstanceName: modelInstance.name,
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
          modelInstanceName: modelInstance.name,
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
  }, [switchOn, switchOff, modelInstance, accessToken]);

  return (
    <div className={cn("flex flex-row", marginBottom)}>
      <StatefulToggleField
        id="pipelineStateToggleButton"
        value={modelInstance?.state === "STATE_ONLINE" ? true : false}
        onChange={changeModelInstanceStateHandler}
        label="State"
        error={error}
        state={
          modelInstance?.state === "STATE_UNSPECIFIED"
            ? "STATE_LOADING"
            : modelInstance?.state || "STATE_UNSPECIFIED"
        }
        disabled={modelInstance?.state === "STATE_UNSPECIFIED"}
        loadingLabelText="Model instance is in the long running operation, please refresh this page to get the new status"
      />
    </div>
  );
};
