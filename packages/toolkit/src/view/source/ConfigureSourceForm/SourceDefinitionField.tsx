import * as React from "react";
import {
  BasicSingleSelect,
  HttpIcon,
  type SingleSelectOption,
} from "@instill-ai/design-system";

import {
  useConfigureSourceFormStore,
  type Nullable,
  type ConnectorResourceWithDefinition,
} from "../../../lib";

export type SourceDefinitionFieldProps = {
  source: Nullable<ConnectorResourceWithDefinition>;
};

export const SourceDefinitionField = (props: SourceDefinitionFieldProps) => {
  const { source } = props;

  // We will disable all the fields if the connector is public (which mean
  // it is provided by Instill AI)
  let disabledAll = false;
  if (
    source &&
    "visibility" in source &&
    source.visibility === "VISIBILITY_PUBLIC"
  ) {
    disabledAll = true;
  }

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
        label: "Start",
        value: "start-operator",
        startIcon: (
          <HttpIcon
            color="fill-instillGrey90"
            height="h-[30px]"
            width="w-[30px]"
            position="my-auto"
          />
        ),
      },
      {
        label: "End",
        value: "end-operator",
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
      label="Operator"
      disabled={disabledAll ? disabledAll : canEdit ? false : true}
      options={sourceDefinitionOptions || []}
      required={true}
      value={selectedSourceDefinitionOption}
    />
  );
};
