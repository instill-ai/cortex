import { FormRoot } from "@instill-ai/design-system";
import { Nullable, SourceWithPipelines } from "../../../lib";
import { ConfigureSourceControl } from "./ConfigureSourceControl";
import { SourceDefinitionField } from "./SourceDefinitionField";

export type ConfigureSourceFormProps = {
  source: Nullable<SourceWithPipelines>;
  onDeleteCallback: Nullable<() => void>;
  marginBottom: Nullable<string>;
  width: string;
};

export const ConfigureSourceForm = ({
  source,
  onDeleteCallback,
  marginBottom,
  width,
}: ConfigureSourceFormProps) => {
  <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
    <div className="flex flex-col gap-y-10">
      <SourceDefinitionField source={source} />
      <ConfigureSourceControl
        source={source}
        onDeleteCallback={onDeleteCallback}
      />
    </div>
  </FormRoot>;
};
