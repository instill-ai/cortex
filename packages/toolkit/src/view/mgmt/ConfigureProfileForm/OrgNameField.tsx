import { ChangeEvent } from "react";
import {
  useConfigureProfileFormStore,
  type ConfigureProfileFormStore,
} from "../../../lib";
import { BasicTextField } from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";

const selector = (state: ConfigureProfileFormStore) => ({
  orgName: state.fields.orgName,
  setFieldValue: state.setFieldValue,
  orgNameError: state.errors.orgName,
});

export const OrgNameField = () => {
  const { orgName, setFieldValue, orgNameError } = useConfigureProfileFormStore(
    selector,
    shallow
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
