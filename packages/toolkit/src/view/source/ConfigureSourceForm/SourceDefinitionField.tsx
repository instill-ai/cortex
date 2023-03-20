import { useEffect, useState } from "react";
import {
  BasicSingleSelect,
  GrpcIcon,
  HttpIcon,
  type SingleSelectOption,
} from "@instill-ai/design-system";

import {
  useConfigureSourceFormStore,
  type Nullable,
  type SourceWithPipelines,
} from "../../../lib";

export type SourceDefinitionFieldProps = {
  source: Nullable<SourceWithPipelines>;
};

export const SourceDefinitionField = ({
  source,
}: SourceDefinitionFieldProps) => {
  /* -------------------------------------------------------------------------
   * Initialize state
   * -----------------------------------------------------------------------*/

  const canEdit = useConfigureSourceFormStore((state) => state.fields.canEdit);
  const [sourceDefinitionOptions, setSourceDefinitionOptions] =
    useState<Nullable<SingleSelectOption[]>>(null);
  const [selectedSourceDefinitionOption, setSelectedSourceDefinitionOption] =
    useState<Nullable<SingleSelectOption>>(null);

  useEffect(() => {
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
      id="sourceDefinition"
      label="Source"
      disabled={canEdit ? false : true}
      options={sourceDefinitionOptions || []}
      required={true}
      value={selectedSourceDefinitionOption}
    />
  );
};
