import * as React from "react";
import {
  BasicSingleSelect,
  getModelDefinitionToolkit,
  getModelInstanceTaskToolkit,
  SingleSelectOption,
} from "@instill-ai/design-system";
import {
  modelHubPresetsList,
  useCreateResourceFormStore,
  type Nullable,
} from "../../../lib";
import { CardBase, CardBaseProps } from "./CardBase";

export type SelectModelPresetCardProps = Pick<CardBaseProps, "marginBottom">;

export const SelectModelPresetCard = ({
  marginBottom,
}: SelectModelPresetCardProps) => {
  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const setFieldValue = useCreateResourceFormStore(
    (state) => state.setFieldValue
  );

  /* -------------------------------------------------------------------------
   * Initialize model preset select
   * -----------------------------------------------------------------------*/

  const [selectedModelPresetOption, setSelectedModelPresetOption] =
    React.useState<Nullable<SingleSelectOption>>(null);

  const selectedModel = React.useMemo(() => {
    if (!selectedModelPresetOption) return null;
    return (
      modelHubPresetsList.find(
        (e) => e.id === selectedModelPresetOption.value
      ) || null
    );
  }, [selectedModelPresetOption]);

  const modelDefinitionToolkit = React.useMemo(() => {
    if (!selectedModel) return null;
    return getModelDefinitionToolkit(selectedModel.model_definition);
  }, [selectedModel]);

  const modelInstanceTaskToolkit = React.useMemo(() => {
    if (!selectedModel) return null;
    return getModelInstanceTaskToolkit(selectedModel.task);
  }, [selectedModel]);

  const modelPresetOptions: SingleSelectOption[] = React.useMemo(() => {
    return modelHubPresetsList.map((e) => ({
      label: e.id,
      value: e.id,
    }));
  }, []);

  /* -------------------------------------------------------------------------
   * Handle preset change
   * -----------------------------------------------------------------------*/

  const handlePresetChange = React.useCallback(
    (option: Nullable<SingleSelectOption>) => {
      setSelectedModelPresetOption(option);

      if (!option) {
        return;
      }

      const selectedModel =
        modelHubPresetsList.find((e) => e.id === option.value) || null;

      if (!selectedModel) {
        return;
      }

      if (selectedModel.model_definition === "model-definitions/github") {
        setFieldValue("model.new.definition", selectedModel.model_definition);
        setFieldValue(
          "model.new.github.repoUrl",
          selectedModel.configuration.repository
        );
        setFieldValue("model.new.github.tag", selectedModel.configuration.tag);
      } else if (
        selectedModel.model_definition === "model-definitions/huggingface"
      ) {
        setFieldValue("model.new.definition", selectedModel.model_definition);
        setFieldValue(
          "model.new.huggingFace.repoUrl",
          selectedModel.configuration.repo_id
        );
      }
    },
    [setFieldValue]
  );

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <CardBase
      title="Please choose a model preset to create"
      marginBottom={marginBottom}
    >
      <div className="flex h-full w-full flex-col p-6">
        {selectedModel ? (
          <>
            <div className="mb-4 flex flex-row gap-x-4">
              {modelDefinitionToolkit
                ? modelDefinitionToolkit.getIcon({
                    width: "w-[30px]",
                    height: "h-[30px]",
                    color: "text-instillGrey90",
                    position: "my-auto",
                  })
                : null}
              <div className="flex flex-row gap-x-[5px] bg-instillGrey05 py-1.5 pl-[5px] pr-2">
                {modelInstanceTaskToolkit
                  ? modelInstanceTaskToolkit.getIcon({
                      width: "w-[18px]",
                      height: "h-[18px]",
                      color: "text-instillGrey90",
                      position: "my-auto",
                    })
                  : null}
                {modelInstanceTaskToolkit?.label}
              </div>
            </div>
            <div className="mb-5 flex flex-col gap-y-1">
              <h2 className="text-instillGrey90 text-instill-h2">
                {selectedModel?.id}
              </h2>
              <p className="text-instillGrey70 text-instill-body">
                {selectedModel?.description}
              </p>
            </div>
          </>
        ) : null}
        <BasicSingleSelect
          id="model-preset"
          label="Select a model preset"
          required={true}
          options={modelPresetOptions}
          value={selectedModelPresetOption}
          description="Model preset that we currently support."
          onChange={handlePresetChange}
          error={null}
          disabled={false}
        />
      </div>
    </CardBase>
  );
};
