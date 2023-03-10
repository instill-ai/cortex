import { ChangeEvent } from "react";
import { useConfigureProfileFormStore } from "@instill-ai/toolkit";
import { BasicTextField } from "@instill-ai/design-system";

export const FirstNameField = () => {
  const firstName = useConfigureProfileFormStore(
    (state) => state.profile.firstName
  );
  const setFieldValue = useConfigureProfileFormStore(
    (state) => state.setFieldValue
  );
  const firstNameError = useConfigureProfileFormStore(
    (state) => state.error.firstName
  );

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
