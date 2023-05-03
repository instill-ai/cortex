import * as React from "react";

import { Nullable, useCreateResourceFormStore } from "../../../lib";
import { CreatePipelineProgress } from "./CreatePipelineProgress";
import { SetPipelineDetailsStep } from "./SetPipelineDetailsStep";
import { SetPipelineDestinationStep } from "./SetPipelineDestinationStep";
import { SetPipelineModelStep } from "./SetPipelineModelStep";
import { SetPipelineModeStep } from "./SetPipelineModeStep";

//  Currently, we make number 0 & 1 stay at the first step
//  0: Choose pipeline mode
//  1: Choose pipeline mode (This should be choose source in the future, when
//     we let user create source)
//  2: choose model
//  3: choose destination
//  4: setup pipeline details

export type CreatePipelineFormProps = {
  onCreate: Nullable<() => void>;
  accessToken: Nullable<string>;
  syncModelOnly: boolean;
  withModelPreset: boolean;
  enabledQuery: boolean;
  disabledCreateModel?: boolean;
};

export const CreatePipelineForm = (props: CreatePipelineFormProps) => {
  const {
    onCreate,
    accessToken,
    syncModelOnly,
    withModelPreset,
    enabledQuery,
    disabledCreateModel,
  } = props;
  const pipelineFormStep = useCreateResourceFormStore(
    (state) => state.pipelineFormStep
  );

  const step = React.useMemo(() => {
    switch (pipelineFormStep) {
      case 0:
      case 1:
        return (
          <SetPipelineModeStep
            syncModelOnly={syncModelOnly}
            accessToken={accessToken}
            enabledQuery={enabledQuery}
          />
        );
      case 2:
        return (
          <SetPipelineModelStep
            withModelPreset={withModelPreset}
            accessToken={accessToken}
            enabledQuery={enabledQuery}
            disabledCreateModel={disabledCreateModel}
          />
        );
      case 3:
        return (
          <SetPipelineDestinationStep
            accessToken={accessToken}
            enabledQuery={enabledQuery}
          />
        );
      case 4:
        return (
          <SetPipelineDetailsStep
            onCreate={onCreate}
            accessToken={accessToken}
          />
        );
      default:
        return null;
    }
  }, [
    pipelineFormStep,
    onCreate,
    accessToken,
    syncModelOnly,
    withModelPreset,
    enabledQuery,
  ]);

  return (
    <div className="flex flex-col">
      <CreatePipelineProgress marginBottom="mb-15" />
      {step}
    </div>
  );
};
