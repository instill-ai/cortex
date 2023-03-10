import { ChangeEvent } from "react";
import { useConfigureProfileFormStore } from "@instill-ai/toolkit";
import { BasicTextField } from "@instill-ai/design-system";

export const OrgNameField = () => {
  const orgName = useConfigureProfileFormStore(
    (state) => state.profile.orgName
  );
  const setFieldValue = useConfigureProfileFormStore(
    (state) => state.setFieldValue
  );
  const orgNameError = useConfigureProfileFormStore(
    (state) => state.error.orgName
  );

  return (
    <div className="w-[287px]">
      <BasicTextField
        id="orgName"
        label="Organisation Name"
        additionalMessageOnLabel="Your company name"
        key="orgName"
        required={true}
        value={orgName}
        error={orgNameError}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFieldValue("orgName", event.target.value.trim())
        }
      />
    </div>
  );
};
