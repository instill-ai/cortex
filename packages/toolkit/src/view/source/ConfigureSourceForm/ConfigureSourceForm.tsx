import { FormRoot, FormRootProps } from "@instill-ai/design-system";
import {
  ConfigureSourceControl,
  ConfigureSourceControlProps,
} from "./ConfigureSourceControl";
import { SourceDefinitionField } from "./SourceDefinitionField";

export type ConfigureSourceFormProps = Pick<
  FormRootProps,
  "width" | "marginBottom"
> &
  ConfigureSourceControlProps;

export const ConfigureSourceForm = (props: ConfigureSourceFormProps) => {
  const {
    source,
    onDelete,
    onConfigure,
    disabledDelete,
    disabledConfigure,
    marginBottom,
    width,
    accessToken,
  } = props;
  return (
    <FormRoot marginBottom={marginBottom} width={width}>
      <div className="flex flex-col gap-y-10">
        <SourceDefinitionField source={source} />
        <ConfigureSourceControl
          source={source}
          onDelete={onDelete}
          onConfigure={onConfigure}
          accessToken={accessToken}
          disabledDelete={disabledDelete}
          disabledConfigure={disabledConfigure}
        />
      </div>
    </FormRoot>
  );
};
