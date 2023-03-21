import { ChangeEvent } from "react";
import { shallow } from "zustand/shallow";
import { BasicTextArea } from "@instill-ai/design-system";

import {
  CreateResourceFormStore,
  useCreateResourceFormStore,
} from "../../../../lib";

const selector = (state: CreateResourceFormStore) => ({
  modelDescription: state.fields.model.new.description,
  modelDescriptionError: state.errors.model.new.description,
  setFieldValue: state.setFieldValue,
});

export const ModelDescriptionField = () => {
  const { modelDescription, modelDescriptionError, setFieldValue } =
    useCreateResourceFormStore(selector, shallow);

  return (
    <BasicTextArea
      id="description"
      label="Description"
      key="description"
      description="Fill with a short description."
      required={false}
      disabled={false}
      value={modelDescription}
      error={modelDescriptionError}
      enableCounter={true}
      counterWordLimit={1023}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        setFieldValue("model.new.description", event.target.value)
      }
    />
  );
};
