import { useMemo } from "react";
import { useConfigureProfileFormStore } from "@instill-ai/toolkit";
import {
  BasicSingleSelect,
  SingleSelectOption,
} from "@instill-ai/design-system";

export type RoleFieldProps = {
  roles: SingleSelectOption[];
};

export const RoleField = ({ roles }: RoleFieldProps) => {
  const role = useConfigureProfileFormStore((state) => state.profile.role);
  const setFieldValue = useConfigureProfileFormStore(
    (state) => state.setFieldValue
  );
  const roleError = useConfigureProfileFormStore((state) => state.error.role);

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
