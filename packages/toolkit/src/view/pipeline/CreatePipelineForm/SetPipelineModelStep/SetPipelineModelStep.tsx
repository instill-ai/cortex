import { FormVerticalDivider } from "../FormVerticalDivider";
import {
  SelectExistingModelFlow,
  SelectExistingModelFlowProps,
} from "./SelectExistingModelFlow";
import {
  CreateModelForm,
  CreateModelFormProps,
  CreateModelWithPresetForm,
} from "../../../model";
import { useCreateResourceFormStore, type Nullable } from "../../../../lib";

export type SetPipelineModelStepProps = {
  accessToken: Nullable<string>;
  withModelPreset: boolean;
} & Pick<SelectExistingModelFlowProps, "models"> &
  Pick<CreateModelFormProps, "modelDefinitions">;

export const SetPipelineModelStep = (props: SetPipelineModelStepProps) => {
  const { accessToken, withModelPreset, models, modelDefinitions } = props;
  const increasePipelineFormStep = useCreateResourceFormStore(
    (state) => state.increasePipelineFormStep
  );

  return (
    <div className="flex flex-1 flex-row h-full items-stretch">
      <div className="flex w-1/3">
        <SelectExistingModelFlow
          onSelect={() => {
            increasePipelineFormStep();
          }}
          accessToken={accessToken}
          models={models}
        />
      </div>
      <div className="flex">
        <FormVerticalDivider />
      </div>
      <div className="flex w-2/3">
        {withModelPreset ? (
          <CreateModelWithPresetForm
            onCreate={() => {
              increasePipelineFormStep();
            }}
            initStoreOnCreate={false}
            accessToken={accessToken}
          />
        ) : (
          <CreateModelForm
            onCreate={() => {
              increasePipelineFormStep();
            }}
            initStoreOnCreate={false}
            accessToken={accessToken}
            modelDefinitions={modelDefinitions}
          />
        )}
      </div>
    </div>
  );
};
