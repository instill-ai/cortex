import { FormVerticalDivider } from "../FormVerticalDivider";
import { UseExistingModelFlow } from "./UseExistingModelFlow";
import { CreateModelWithPresetForm } from "../../../model";
import { useCreateResourceFormStore, type Nullable } from "../../../../lib";

export type SetPipelineModelStepProps = {
  accessToken: Nullable<string>;
};

export const SetPipelineModelStep = ({
  accessToken,
}: SetPipelineModelStepProps) => {
  const increasePipelineFormStep = useCreateResourceFormStore(
    (state) => state.increasePipelineFormStep
  );

  return (
    <div className="flex flex-1 flex-row h-full items-stretch">
      <div className="flex w-1/3">
        <UseExistingModelFlow accessToken={accessToken} />
      </div>
      <div className="flex">
        <FormVerticalDivider />
      </div>
      <div className="flex w-2/3">
        <CreateModelWithPresetForm
          onCreate={() => {
            increasePipelineFormStep();
          }}
          initStoreOnCreate={false}
          marginBottom={null}
          width="w-full"
          accessToken={accessToken}
        />
      </div>
    </div>
  );
};
