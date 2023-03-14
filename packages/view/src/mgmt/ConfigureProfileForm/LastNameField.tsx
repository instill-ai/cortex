import { ChangeEvent } from "react";
import {
  ConfigureProfileFormStore,
  useConfigureProfileFormStore,
} from "@instill-ai/toolkit";
import { BasicTextField } from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";

const selector = (state: ConfigureProfileFormStore) => ({
  lastName: state.fields.lastName,
  setFieldValue: state.setFieldValue,
  lastNameError: state.errors.lastName,
});

export const LastNameField = () => {
  const { lastName, setFieldValue, lastNameError } =
    useConfigureProfileFormStore(selector, shallow);

  return (
    <div className="w-[287px]">
      <BasicTextField
        id="lastName"
        label="Last name"
        key="lastName"
        additionalMessageOnLabel="(optional)"
        required={true}
        value={lastName}
        error={lastNameError}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFieldValue("lastName", event.target.value.trim())
        }
      />
    </div>
  );
};
