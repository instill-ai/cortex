import { BasicTextArea } from "@instill-ai/design-system";
import {
  ConfigurePipelineFormStore,
  useConfigurePipelineFormStore,
} from "@instill-ai/toolkit";
import { ChangeEvent } from "react";
import { shallow } from "zustand/shallow";

const selector = (state: ConfigurePipelineFormStore) => ({
  pipelineDescription: state.fields.pipelineDescription,
  pipelineDescriptionError: state.errors.pipelineDescription,
  canEdit: state.fields.canEdit,
  setFieldValue: state.setFieldValue,
});

export const PipelineDescriptionField = () => {
  const {
    pipelineDescription,
    pipelineDescriptionError,
    canEdit,
    setFieldValue,
  } = useConfigurePipelineFormStore(selector, shallow);

  return (
    <BasicTextArea
      id="pipelineDescription"
      label="Description"
      key="pipelineDescription"
      description="Fill with a short description."
      required={false}
      disabled={canEdit ? false : true}
      error={pipelineDescription}
      value={pipelineDescriptionError}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
        setFieldValue("pipelineDescription", event.target.value);
      }}
    />
  );
};
