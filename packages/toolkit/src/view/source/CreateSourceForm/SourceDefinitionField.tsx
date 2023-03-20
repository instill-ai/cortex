import { useCallback, useMemo } from "react";
import {
  BasicSingleSelect,
  SingleSelectOption,
} from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";

import {
  CreateSourceFormStore,
  Nullable,
  useCreateSourceFormStore,
} from "../../../lib";

export type SourceDefinitionFieldProps = {
  sourceDefinitionOptions: SingleSelectOption[];
};

const selector = (state: CreateSourceFormStore) => ({
  sourceDefinition: state.fields.sourceDefinition,
  sourceDefinitionError: state.errors.sourceDefinition,
  setFieldValue: state.setFieldValue,
});

export const SourceDefinitionField = ({
  sourceDefinitionOptions,
}: SourceDefinitionFieldProps) => {
  const { sourceDefinition, sourceDefinitionError, setFieldValue } =
    useCreateSourceFormStore(selector, shallow);

  const selectedSourceDefinitionOption = useMemo(() => {
    return (
      sourceDefinitionOptions.find(
        (option) => option.value === sourceDefinition
      ) || null
    );
  }, [sourceDefinition]);

  const handleSourceDefinitionChange = useCallback(
    (option: Nullable<SingleSelectOption>) => {
      setFieldValue("sourceDefinition", option?.value || null);
    },
    []
  );

  return (
    <div className="flex flex-col">
      <BasicSingleSelect
        id="sourceDefinition"
        label="Source type"
        options={sourceDefinitionOptions}
        value={selectedSourceDefinitionOption}
        error={sourceDefinitionError}
        onChange={handleSourceDefinitionChange}
        required={true}
        description={`<a href=${
          sourceDefinition === null
            ? "https://www.instill.tech/docs/source-connectors/overview"
            : sourceDefinition === "source-http"
            ? "https://www.instill.tech/docs/source-connectors/http"
            : "https://www.instill.tech/docs/source-connectors/grpc"
        }>Setup Guide</a>`}
      />
    </div>
  );
};
