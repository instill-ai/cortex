import cn from "clsx";
import { FormVerticalDivider } from "../FormVerticalDivider";
import { SelectExistingModelFlow } from "./SelectExistingModelFlow";
import { CreateModelForm, CreateModelWithPresetForm } from "../../../model";
import {
  useCreateResourceFormStore,
  prefetchDestinations,
  type Nullable,
} from "../../../../lib";

export type SetPipelineModelStepProps = {
  accessToken: Nullable<string>;
  withModelPreset: boolean;
  enabledQuery: boolean;
  disabledCreateModel?: boolean;
};

export const SetPipelineModelStep = (props: SetPipelineModelStepProps) => {
  const { accessToken, withModelPreset, enabledQuery, disabledCreateModel } =
    props;
  const increasePipelineFormStep = useCreateResourceFormStore(
    (state) => state.increasePipelineFormStep
  );

  return (
    <div className="flex flex-1 flex-row h-full items-stretch">
      <div className={cn("flex", disabledCreateModel ? "w-full" : "w-1/3")}>
        <SelectExistingModelFlow
          onSelect={async () => {
            increasePipelineFormStep();
            await prefetchDestinations(accessToken, 10 * 1000);
          }}
          accessToken={accessToken}
          enabledQuery={enabledQuery}
        />
      </div>
      {disabledCreateModel ? null : (
        <>
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
                enabledQuery={enabledQuery}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
