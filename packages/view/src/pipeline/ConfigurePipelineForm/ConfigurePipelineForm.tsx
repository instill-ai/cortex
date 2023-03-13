import { FormRoot } from "@instill-ai/design-system";
import { Nullable, Pipeline } from "@instill-ai/toolkit";
import { ConfigurePipelineFormControl } from "./ConfigurePipelineFormControl";
import { PipelineDescriptionField } from "./PipelineDescriptionField";

export type ConfigurePipelineFormProps = {
  pipeline: Nullable<Pipeline>;
  marginBottom: Nullable<string>;
  width: Nullable<string>;
};

export const ConfigurePipelineForm = ({
  marginBottom,
  width,
  pipeline,
}: ConfigurePipelineFormProps) => {
  return (
    <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
      <div className="flex flex-col gap-y-10">
        <PipelineDescriptionField />
        <ConfigurePipelineFormControl pipeline={pipeline} />
      </div>
    </FormRoot>
  );
};
