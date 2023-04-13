import { BasicTextField } from "@instill-ai/design-system";
import * as React from "react";
import { shallow } from "zustand/shallow";
import {
  useCreateResourceFormStore,
  validateResourceId,
  type CreateResourceFormStore,
} from "../../../../lib";

const selector = (state: CreateResourceFormStore) => ({
  modelId: state.fields.model.new.id,
  modelIdError: state.errors.model.new.id,
  setFieldValue: state.setFieldValue,
  setFieldError: state.setFieldError,
});

export const ModelIdField = () => {
  const { modelId, modelIdError, setFieldError, setFieldValue } =
    useCreateResourceFormStore(selector, shallow);

  return (
    <BasicTextField
      id="model-id"
      label="Model ID"
      key="id"
      description="Pick a name to help you identify this resource. 
        The ID conforms to RFC-1034, which restricts to letters, 
        numbers, and hyphen, with the first character a letter, 
        the last a letter or a number, and a 63 character maximum."
      required={true}
      disabled={false}
      value={modelId}
      error={modelIdError}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
          setFieldValue("model.new.id", null);
          setFieldError("model.new.id", null);
          return;
        }

        const value = event.target.value.trim();

        if (validateResourceId(value)) {
          setFieldValue("model.new.id", value);
          setFieldError("model.new.id", null);
        } else {
          setFieldValue("model.new.id", value);
          setFieldError(
            "model.new.id",
            "Resource ID restricts to lowercase letters, numbers, and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum."
          );
        }
      }}
    />
  );
};
