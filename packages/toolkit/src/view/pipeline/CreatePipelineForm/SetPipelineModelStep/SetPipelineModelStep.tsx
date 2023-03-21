import { FormVerticalDivider } from "../../../FormVerticalDivider";
import { NextUseExistingModeInstancelFlow } from "./UseExistingModelInstanceFlow";
import { CreateModelWithPresetForm } from "../../../model";
import { useCreateResourceFormStore } from "../../../../lib";

export const SetPipelineModelStep = () => {
  const increasePipelineFormStep = useCreateResourceFormStore(
    (state) => state.increasePipelineFormStep
  );

  return (
    <div className="flex flex-1 flex-row">
      <div className="flex w-1/3">
        <NextUseExistingModeInstancelFlow />
      </div>
      <FormVerticalDivider />
      <div className="flex w-2/3">
        <CreateModelWithPresetForm
          onSuccessfulComplete={() => {
            increasePipelineFormStep();
          }}
          marginBottom={null}
          width="w-full"
        />
      </div>
    </div>
  );
};
