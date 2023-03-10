import { ChangeEvent } from "react";
import { useConfigureProfileFormStore } from "@instill-ai/toolkit";
import { BasicTextField } from "@instill-ai/design-system";

export const LastNameField = () => {
  const lastName = useConfigureProfileFormStore(
    (state) => state.profile.lastName
  );
  const setFieldValue = useConfigureProfileFormStore(
    (state) => state.setFieldValue
  );
  const lastNameError = useConfigureProfileFormStore(
    (state) => state.error.lastName
  );

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
