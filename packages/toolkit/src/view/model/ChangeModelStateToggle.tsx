import cn from "clsx";
import axios from "axios";
import { StatefulToggleField } from "@instill-ai/design-system";
import { useState, useEffect, useCallback } from "react";
import { UseMutationResult } from "@tanstack/react-query";

import { Model, ModelState, Nullable, Operation } from "../../lib";

export type ChangeModelStateToggleProps = {
  model: Nullable<Model>;
  modelWatchState: Nullable<ModelState>;
  switchOff: UseMutationResult<
    { modelName: string; operation: Operation },
    unknown,
    {
      modelName: string;
      accessToken: Nullable<string>;
    },
    unknown
  >;
  switchOn: UseMutationResult<
    { modelName: string; operation: Operation },
    unknown,
    {
      modelName: string;
      accessToken: Nullable<string>;
    },
    unknown
  >;
  marginBottom?: string;
  accessToken: Nullable<string>;
  disabled: boolean;
};

export const ChangeModelStateToggle = ({
  model,
  modelWatchState,
  switchOn,
  switchOff,
  marginBottom,
  accessToken,
  disabled,
}: ChangeModelStateToggleProps) => {
  const [error, setError] = useState<Nullable<string>>(null);

  useEffect(() => {
    if (modelWatchState === "STATE_ERROR") {
      setError("Something went wrong. Please try again.");
    } else {
      setError(null);
    }
  }, [modelWatchState]);

  const changeModelInstanceStateHandler = useCallback(() => {
    if (!model || !modelWatchState || modelWatchState === "STATE_UNSPECIFIED") {
      return;
    }

    if (modelWatchState === "STATE_ONLINE") {
      switchOff.mutate(
        {
          modelName: model.name,
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
          modelName: model.name,
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
  }, [switchOn, switchOff, model, accessToken, modelWatchState]);

  return (
    <div className={cn("flex flex-row", marginBottom)}>
      <StatefulToggleField
        id="model-state-toggle"
        value={modelWatchState === "STATE_ONLINE" ? true : false}
        onChange={changeModelInstanceStateHandler}
        label="State"
        error={error}
        state={
          modelWatchState === "STATE_UNSPECIFIED"
            ? "STATE_LOADING"
            : modelWatchState || "STATE_UNSPECIFIED"
        }
        disabled={disabled ? true : modelWatchState === "STATE_UNSPECIFIED"}
        loadingLabelText="Model is in the long running operation, please refresh this page to get the new status"
      />
    </div>
  );
};
