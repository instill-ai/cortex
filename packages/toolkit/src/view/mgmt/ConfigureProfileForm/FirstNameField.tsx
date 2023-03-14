import { ChangeEvent } from "react";
import {
  useConfigureProfileFormStore,
  type ConfigureProfileFormStore,
} from "../../../lib";
import { BasicTextField } from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";

const selector = (state: ConfigureProfileFormStore) => ({
  firstName: state.fields.firstName,
  setFieldValue: state.setFieldValue,
  firstNameError: state.errors.firstName,
});

export const FirstNameField = () => {
  const { firstName, setFieldValue, firstNameError } =
    useConfigureProfileFormStore(selector, shallow);

  return (
    <div className="w-[287px]">
      <BasicTextField
        id="firstName"
        label="First Name"
        additionalMessageOnLabel="(optional)"
        key="firstName"
        required={true}
        value={firstName}
        error={firstNameError}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFieldValue("firstName", event.target.value.trim())
        }
      />
    </div>
  );
};
