import { ChangeEvent } from "react";
import { BasicTextField } from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";
import {
  useConfigureProfileFormStore,
  validateResourceId,
  type Nullable,
  type User,
  type ConfigureProfileFormStore,
} from "../../../lib";

const selector = (state: ConfigureProfileFormStore) => ({
  userName: state.fields.userName,
  userNameError: state.errors.userName,
  setFieldValue: state.setFieldValue,
  setFieldError: state.setFieldError,
});

export type UserNameFieldProps = {
  user: Nullable<User>;
};

export const UserNameField = (props: UserNameFieldProps) => {
  const { user } = props;
  const { userName, userNameError, setFieldValue, setFieldError } =
    useConfigureProfileFormStore(selector, shallow);

  return (
    <div className="w-[287px]">
      <BasicTextField
        id="userName"
        label="Username"
        key="userName"
        additionalMessageOnLabel="This will be your unique identifier"
        required={true}
        value={userName ? userName : user?.name || null}
        error={userNameError}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value.trim();
          setFieldValue("userName", value);
          if (!validateResourceId(value)) {
            setFieldError(
              "userName",
              "Resource ID restricts to lowercase letters, numbers, and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum."
            );
          } else {
            setFieldError("userName", null);
          }
        }}
      />
    </div>
  );
};
