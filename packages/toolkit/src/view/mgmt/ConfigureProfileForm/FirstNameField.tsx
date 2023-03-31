import { ChangeEvent } from "react";
import { BasicTextField } from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";
import {
  useConfigureProfileFormStore,
  type Nullable,
  type User,
  type ConfigureProfileFormStore,
} from "../../../lib";

const selector = (state: ConfigureProfileFormStore) => ({
  firstName: state.fields.firstName,
  setFieldValue: state.setFieldValue,
  firstNameError: state.errors.firstName,
});

export type FirstNameFieldProps = {
  user: Nullable<User>;
};

export const FirstNameField = (props: FirstNameFieldProps) => {
  const { user } = props;
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
        value={firstName ? firstName : user?.first_name || null}
        error={firstNameError}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFieldValue("firstName", event.target.value.trim())
        }
      />
    </div>
  );
};
