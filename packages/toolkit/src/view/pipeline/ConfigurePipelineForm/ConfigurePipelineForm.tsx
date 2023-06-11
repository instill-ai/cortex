import * as React from "react";
import {
  BasicProgressMessageBox,
  FormRoot,
  FormRootProps,
  ProgressMessageBoxState,
} from "@instill-ai/design-system";
import { type Nullable, type Pipeline } from "../../../lib";

import {
  ConfigurePipelineFormControl,
  ConfigurePipelineFormControlProps,
} from "./ConfigurePipelineFormControl";
import { PipelineDescriptionField } from "./PipelineDescriptionField";

export type ConfigurePipelineFormProps = {
  pipeline: Nullable<Pipeline>;
  accessToken: Nullable<string>;
  onDelete: Nullable<() => void>;
} & Pick<FormRootProps, "width" | "marginBottom"> &
  Pick<
    ConfigurePipelineFormControlProps,
    "disabledConfigure" | "disabledDelete" | "onConfigure"
  >;

export const ConfigurePipelineForm = (props: ConfigurePipelineFormProps) => {
  const {
    pipeline,
    accessToken,
    onConfigure,
    disabledConfigure,
    onDelete,
    disabledDelete,
    width,
    marginBottom,
  } = props;
  const [messsageBoxState, setMessageBoxState] =
    React.useState<ProgressMessageBoxState>({
      activate: false,
      status: null,
      message: null,
      description: null,
    });

  return (
    <>
      <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
        <div className="flex flex-col gap-y-10">
          <PipelineDescriptionField pipeline={pipeline} />
          <ConfigurePipelineFormControl
            pipeline={pipeline}
            setMessageBoxState={setMessageBoxState}
            onConfigure={onConfigure}
            accessToken={accessToken}
            disabledConfigure={disabledConfigure}
            disabledDelete={disabledDelete}
            onDelete={onDelete}
          />
          <div className="flex">
            <BasicProgressMessageBox
              state={messsageBoxState}
              setActivate={(activate) =>
                setMessageBoxState((prev) => ({ ...prev, activate }))
              }
              width="w-[25vw]"
              closable={true}
            />
          </div>
        </div>
      </FormRoot>
    </>
  );
};
