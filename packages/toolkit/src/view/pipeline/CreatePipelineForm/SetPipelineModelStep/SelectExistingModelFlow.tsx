import * as React from "react";
import { shallow } from "zustand/shallow";
import {
  BasicSingleSelect,
  SingleSelectOption,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useModels,
  useAmplitudeCtx,
  sendAmplitudeData,
  useCreateResourceFormStore,
  prefetchDestinations,
  useQueryClient,
  type CreateResourceFormStore,
  type Nullable,
} from "../../../../lib";

const selector = (state: CreateResourceFormStore) => ({
  modelType: state.fields.model.type,
  setFieldValue: state.setFieldValue,
});

export type SelectExistingModelFlowProps = {
  accessToken: Nullable<string>;
  onSelect: () => void;
  enabledQuery: boolean;
};

export const SelectExistingModelFlow = (
  props: SelectExistingModelFlowProps
) => {
  const { accessToken, onSelect, enabledQuery } = props;
  const { amplitudeIsInit } = useAmplitudeCtx();
  const queryClient = useQueryClient();

  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const { modelType, setFieldValue } = useCreateResourceFormStore(
    selector,
    shallow
  );

  /* -------------------------------------------------------------------------
   * Prepare existing online model instances.
   * -----------------------------------------------------------------------*/

  const [modelOptions, setModelOptions] =
    React.useState<Nullable<SingleSelectOption[]>>(null);
  const [selectedModelOption, setSelectedModelOption] =
    React.useState<Nullable<SingleSelectOption>>(null);

  const models = useModels({
    accessToken,
    enabled: enabledQuery,
  });

  React.useEffect(() => {
    if (!models.isSuccess) return;

    const onlineModels = models.data.filter((e) => e.state === "STATE_ONLINE");

    setModelOptions(
      onlineModels.map((e) => ({ label: e.name, value: e.name }))
    );
  }, [models.isSuccess, models.data]);

  /* -------------------------------------------------------------------------
   * Use existing model
   * -----------------------------------------------------------------------*/

  const canUseExistingModel = React.useMemo(() => {
    if (modelType === "new") {
      return false;
    }

    return true;
  }, [modelType]);

  const handleUseModel = React.useCallback(async () => {
    if (!models.isSuccess) {
      return;
    }

    prefetchDestinations(queryClient, accessToken, 10 * 1000);

    const targetModel = models.data.find(
      (e) => e.name === (selectedModelOption?.value as string)
    );

    if (!targetModel) return;

    const instanceNameList = targetModel.name.split("/");

    setFieldValue("model.existing.id", instanceNameList[1]);
    setFieldValue("model.existing.definition", targetModel.model_definition);
    onSelect();

    if (amplitudeIsInit) {
      sendAmplitudeData("use_existing_model_instance", {
        type: "critical_action",
        process: "pipeline",
      });
    }
  }, [
    amplitudeIsInit,
    selectedModelOption?.value,
    setFieldValue,
    onSelect,
    models.data,
    models.isSuccess,
    accessToken,
    queryClient,
  ]);

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <div className="flex flex-1 flex-col gap-y-5 p-5">
      <BasicSingleSelect
        id="existing-model"
        label="Online models"
        options={modelOptions ? modelOptions : []}
        value={selectedModelOption}
        onChange={(option: Nullable<SingleSelectOption>) => {
          setSelectedModelOption(option);
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
