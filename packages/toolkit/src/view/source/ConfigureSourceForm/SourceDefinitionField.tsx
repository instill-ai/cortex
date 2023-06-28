import * as React from "react";
import {
  BasicSingleSelect,
  GrpcIcon,
  HttpIcon,
  type SingleSelectOption,
} from "@instill-ai/design-system";

import {
  useConfigureSourceFormStore,
  type Nullable,
  type ConnectorWithDefinition,
} from "../../../lib";

export type SourceDefinitionFieldProps = {
  source: Nullable<ConnectorWithDefinition>;
};

export const SourceDefinitionField = (props: SourceDefinitionFieldProps) => {
  const { source } = props;
  /* -------------------------------------------------------------------------
   * Initialize state
   * -----------------------------------------------------------------------*/

  const canEdit = useConfigureSourceFormStore((state) => state.fields.canEdit);
  const [sourceDefinitionOptions, setSourceDefinitionOptions] =
    React.useState<Nullable<SingleSelectOption[]>>(null);
  const [selectedSourceDefinitionOption, setSelectedSourceDefinitionOption] =
    React.useState<Nullable<SingleSelectOption>>(null);

  React.useEffect(() => {
    if (!source) return;

    const options = [
      {
        label: "gRPC",
        value: "source-grpc",
        startIcon: (
          <GrpcIcon
            color="fill-instillGrey90"
            height="h-[30px]"
            width="w-[30px]"
            position="my-auto"
          />
        ),
      },
      {
        label: "HTTP",
        value: "source-http",
        startIcon: (
          <HttpIcon
            color="fill-instillGrey90"
            height="h-[30px]"
            width="w-[30px]"
            position="my-auto"
          />
        ),
      },
    ];

    setSourceDefinitionOptions(options);
    setSelectedSourceDefinitionOption(
      options.find((e) => e.value === source.id) || null
    );
  }, [source]);

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <BasicSingleSelect
      id="source-definition"
      label="Source"
      disabled={canEdit ? false : true}
      options={sourceDefinitionOptions || []}
      required={true}
      value={selectedSourceDefinitionOption}
    />
  );
};
