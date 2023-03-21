import { useCallback, useMemo } from "react";
import {
  BasicSingleSelect,
  SingleSelectOption,
} from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";

import {
  useCreateResourceFormStore,
  type CreateResourceFormStore,
  type Nullable,
} from "../../../lib";

export type SourceDefinitionFieldProps = {
  sourceDefinitionOptions: SingleSelectOption[];
};

const selector = (state: CreateResourceFormStore) => ({
  sourceDefinition: state.fields.source.new.definition,
  sourceDefinitionError: state.errors.source.new.definition,
  setFieldValue: state.setFieldValue,
});

export const SourceDefinitionField = ({
  sourceDefinitionOptions,
}: SourceDefinitionFieldProps) => {
  const { sourceDefinition, sourceDefinitionError, setFieldValue } =
    useCreateResourceFormStore(selector, shallow);

  const selectedSourceDefinitionOption = useMemo(() => {
    return (
      sourceDefinitionOptions.find(
        (option) => option.value === sourceDefinition
      ) || null
    );
  }, [sourceDefinition, sourceDefinitionOptions]);

  const handleSourceDefinitionChange = useCallback(
    (option: Nullable<SingleSelectOption>) => {
      setFieldValue("source.new.definition", option?.value || null);
    },
    [setFieldValue]
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
