import cn from "clsx";
import axios from "axios";
import { StatefulToggleField } from "@instill-ai/design-system";
import { FC, useState, useEffect, useCallback } from "react";
import { UseMutationResult } from "@tanstack/react-query";

import { Model, Nullable, Operation } from "../../lib";

export type ChangeModelStateToggleProps = {
  model: Nullable<Model>;
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
};

export const ChangeModelStateToggle: FC<ChangeModelStateToggleProps> = ({
  model,
  switchOn,
  switchOff,
  marginBottom,
  accessToken,
}) => {
  const [error, setError] = useState<Nullable<string>>(null);

  useEffect(() => {
    setError(null);
  }, [model]);

  const changeModelInstanceStateHandler = useCallback(() => {
    if (!model || model.state === "STATE_UNSPECIFIED") return;

    if (model.state === "STATE_ONLINE") {
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
  }, [switchOn, switchOff, model, accessToken]);

  return (
    <div className={cn("flex flex-row", marginBottom)}>
      <StatefulToggleField
        id="model-state-toggle"
        value={model?.state === "STATE_ONLINE" ? true : false}
        onChange={changeModelInstanceStateHandler}
        label="State"
        error={error}
        state={
          model?.state === "STATE_UNSPECIFIED"
            ? "STATE_LOADING"
            : model?.state || "STATE_UNSPECIFIED"
        }
        disabled={model?.state === "STATE_UNSPECIFIED"}
        loadingLabelText="Model instance is in the long running operation, please refresh this page to get the new status"
      />
    </div>
  );
};
