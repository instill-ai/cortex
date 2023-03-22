import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BasicSingleSelect,
  SingleSelectOption,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useModelsInstances,
  useAmplitudeCtx,
  sendAmplitudeData,
  useCreateResourceFormStore,
  type CreateResourceFormStore,
  type Nullable,
} from "../../../../lib";
import { shallow } from "zustand/shallow";

const selector = (state: CreateResourceFormStore) => ({
  modelType: state.fields.model.type,
  existingModelInstanceTag: state.fields.model.existing.instanceTag,
  existingModelInstanceTagError: state.errors.model.existing.instanceTag,
  increasePipelineFormStep: state.increasePipelineFormStep,
  setFieldValue: state.setFieldValue,
});

export const NextUseExistingModeInstancelFlow = () => {
  const { amplitudeIsInit } = useAmplitudeCtx();

  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const {
    modelType,
    existingModelInstanceTag,
    existingModelInstanceTagError,
    increasePipelineFormStep,
    setFieldValue,
  } = useCreateResourceFormStore(selector, shallow);

  /* -------------------------------------------------------------------------
   * Prepare existing online model instances.
   * -----------------------------------------------------------------------*/

  const [modelInstanceOptions, setModelInstanceOptions] =
    useState<Nullable<SingleSelectOption[]>>(null);

  // We use state instead of calculated it from existinInstanceTag is because
  // in the selectedModelInstanceOption.value we used full model name but in
  // existinInstanceTag we store only modelInstanceTag
  const [selectedModelInstanceOption, setSelectedModelInstanceOption] =
    useState<Nullable<SingleSelectOption>>(null);

  const modelInstances = useModelsInstances({
    enable: true,
    accessToken: null,
  });

  useEffect(() => {
    if (!modelInstances.isSuccess || !modelInstances.data) return;

    const onlineModelInstances = modelInstances.data.filter(
      (e) => e.state === "STATE_ONLINE"
    );

    setModelInstanceOptions(
      onlineModelInstances.map((e) => {
        const instanceNameList = e.name.split("/");
        const modelId = instanceNameList[1];

        return {
          label: `${modelId}/${e.id}`,
          value: e.name,
        };
      })
    );
  }, [modelInstances.isSuccess, modelInstances.data]);

  /* -------------------------------------------------------------------------
   * Use existing model
   * -----------------------------------------------------------------------*/

  const canUseExistingModel = useMemo(() => {
    if (!existingModelInstanceTag || modelType === "new") {
      return false;
    }

    return true;
  }, [existingModelInstanceTag, modelType]);

  const handleUseModel = useCallback(() => {
    if (
      !existingModelInstanceTag ||
      !modelInstances.isSuccess ||
      !modelInstances.data
    ) {
      return;
    }

    const targetModelInstance = modelInstances.data.find(
      (e) => e.name === (selectedModelInstanceOption?.value as string)
    );

    if (!targetModelInstance) return;

    const instanceNameList = targetModelInstance.name.split("/");

    setFieldValue("model.existing.id", instanceNameList[1]);
    setFieldValue(
      "model.existing.definition",
      targetModelInstance.model_definition
    );
    increasePipelineFormStep();

    if (amplitudeIsInit) {
      sendAmplitudeData("use_existing_model_instance", {
        type: "critical_action",
        process: "pipeline",
      });
    }
  }, [
    existingModelInstanceTag,
    modelInstances.isSuccess,
    modelInstances.data,
    amplitudeIsInit,
    increasePipelineFormStep,
    selectedModelInstanceOption?.value,
    setFieldValue,
  ]);

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <div className="flex flex-1 flex-col gap-y-5 p-5">
      <BasicSingleSelect
        id="existingModelInstanceTag"
        label="Online model instances"
        options={modelInstanceOptions ? modelInstanceOptions : []}
        value={selectedModelInstanceOption}
        error={existingModelInstanceTagError}
        onChange={(option: Nullable<SingleSelectOption>) => {
          setSelectedModelInstanceOption(option);
          if (option) {
            const instanceNameList = (option.value as string).split("/");
            setFieldValue("model.existing.instanceTag", instanceNameList[3]);
          }
        }}
        disabled={modelType === "new" ? true : false}
        required={true}
      />
      <SolidButton
        position="ml-auto"
        type="button"
        color="primary"
        disabled={canUseExistingModel ? false : true}
        onClickHandler={handleUseModel}
      >
        Select
      </SolidButton>
    </div>
  );
};
