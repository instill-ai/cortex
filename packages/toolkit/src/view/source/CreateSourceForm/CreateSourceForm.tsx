import * as React from "react";
import {
  FormRoot,
  SingleSelectOption,
  HttpIcon,
  FormRootProps,
} from "@instill-ai/design-system";

import {
  CreateSourceControl,
  type CreateSourceControlProps,
} from "./CreateSourceControl";
import { SourceDefinitionField } from "./SourceDefinitionField";
import { useConnectors } from "../../../lib";

export type CreateSourceFormProps = Pick<
  FormRootProps,
  "marginBottom" | "width"
> &
  Pick<CreateSourceControlProps, "accessToken" | "onCreate"> & {
    enabledQuery: boolean;
  };

export const CreateSourceForm = (props: CreateSourceFormProps) => {
  const { marginBottom, width, onCreate, accessToken, enabledQuery } = props;
  const [sourceDefinitionOptions, setSourceDefinitionOptions] = React.useState<
    SingleSelectOption[]
  >([]);

  const connectors = useConnectors({
    connectorType: "CONNECTOR_TYPE_OPERATOR",
    accessToken,
    enabled: enabledQuery,
  });

  React.useEffect(() => {
    if (!connectors.isSuccess) return;

    setSourceDefinitionOptions([
      {
        label: "Trigger",
        value: "trigger",
        startIcon: (
          <HttpIcon
            color="fill-instillGrey90"
            height="h-[30px]"
            width="w-[30px]"
            position="my-auto"
          />
        ),
      },
    ]);
  }, [connectors.isSuccess]);

  return (
    <FormRoot marginBottom={marginBottom} width={width}>
      <div className="flex flex-col gap-y-6">
        <SourceDefinitionField
          sourceDefinitionOptions={sourceDefinitionOptions}
        />
        <CreateSourceControl
          sources={connectors.isSuccess ? connectors.data : null}
          onCreate={onCreate}
          accessToken={accessToken}
        />
      </div>
    </FormRoot>
  );
};
