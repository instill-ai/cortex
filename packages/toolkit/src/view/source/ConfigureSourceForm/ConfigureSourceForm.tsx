import { FormRoot } from "@instill-ai/design-system";
import { Nullable, SourceWithPipelines } from "../../../lib";
import { ConfigureSourceControl } from "./ConfigureSourceControl";
import { SourceDefinitionField } from "./SourceDefinitionField";

export type ConfigureSourceFormProps = {
  source: Nullable<SourceWithPipelines>;
  onDelete: Nullable<() => void>;
  marginBottom: Nullable<string>;
  width: string;
};

export const ConfigureSourceForm = ({
  source,
  onDelete,
  marginBottom,
  width,
}: ConfigureSourceFormProps) => {
  <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
    <div className="flex flex-col gap-y-10">
      <SourceDefinitionField source={source} />
      <ConfigureSourceControl source={source} onDelete={onDelete} />
    </div>
  </FormRoot>;
};
