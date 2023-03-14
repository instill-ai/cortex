import { useMemo } from "react";
import {
  useConfigureProfileFormStore,
  type ConfigureProfileFormStore,
} from "../../../lib";
import {
  BasicSingleSelect,
  SingleSelectOption,
} from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";

export type RoleFieldProps = {
  roles: SingleSelectOption[];
};

const selector = (state: ConfigureProfileFormStore) => ({
  role: state.fields.role,
  setFieldValue: state.setFieldValue,
  roleError: state.errors.role,
});

export const RoleField = ({ roles }: RoleFieldProps) => {
  const { role, setFieldValue, roleError } = useConfigureProfileFormStore(
    selector,
    shallow
  );

  const selectedRoleOption = useMemo(() => {
    return roles.find((e) => e.value === role) || null;
  }, [roles, role]);

  return (
    <div className="w-[287px]">
      <BasicSingleSelect
        id="role"
        instanceId="role"
        label="Role"
        additionalMessageOnLabel="(optional)"
        key="role"
        required={true}
        options={roles}
        value={selectedRoleOption}
        error={roleError}
        onChange={(option) =>
          setFieldValue("role", option ? option.value.toString() : null)
        }
      />
    </div>
  );
};
