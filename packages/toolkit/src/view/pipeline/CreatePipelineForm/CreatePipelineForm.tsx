import { useMemo } from "react";

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
};

export const CreatePipelineForm = ({
  onCreate,
  accessToken,
}: CreatePipelineFormProps) => {
  const pipelineFormStep = useCreateResourceFormStore(
    (state) => state.pipelineFormStep
  );

  const step = useMemo(() => {
    switch (pipelineFormStep) {
      case 0:
      case 1:
        return <SetPipelineModeStep accessToken={accessToken} />;
      case 2:
        return <SetPipelineModelStep accessToken={accessToken} />;
      case 3:
        return <SetPipelineDestinationStep accessToken={accessToken} />;
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
  }, [pipelineFormStep, onCreate]);

  return (
    <div className="flex flex-col">
      <CreatePipelineProgress marginBottom="mb-15" />
      {step}
    </div>
  );
};
