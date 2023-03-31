import * as React from "react";
import { shallow } from "zustand/shallow";
import { BasicTextArea } from "@instill-ai/design-system";
import {
  useConfigurePipelineFormStore,
  type Nullable,
  type Pipeline,
  type ConfigurePipelineFormStore,
} from "../../../lib";

const selector = (state: ConfigurePipelineFormStore) => ({
  pipelineDescription: state.fields.pipelineDescription,
  pipelineDescriptionError: state.errors.pipelineDescription,
  canEdit: state.fields.canEdit,
  setFieldValue: state.setFieldValue,
});

export type PipelineDescriptionFieldProps = {
  pipeline: Nullable<Pipeline>;
};

export const PipelineDescriptionField = (
  props: PipelineDescriptionFieldProps
) => {
  const { pipeline } = props;
  const {
    pipelineDescription,
    pipelineDescriptionError,
    canEdit,
    setFieldValue,
  } = useConfigurePipelineFormStore(selector, shallow);

  React.useEffect(() => {
    setFieldValue("pipelineDescription", pipeline?.description || null);
  }, [pipeline?.description]);

  return (
    <BasicTextArea
      id="pipelineDescription"
      label="Description"
      key="pipelineDescription"
      description="Fill with a short description."
      required={false}
      disabled={canEdit ? false : true}
      error={pipelineDescriptionError}
      value={pipelineDescription}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFieldValue("pipelineDescription", event.target.value);
      }}
    />
  );
};
