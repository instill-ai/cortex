import { useMemo } from "react";
import {
  BasicSingleSelect,
  SingleSelectOption,
} from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";
import {
  useConfigureProfileFormStore,
  type Nullable,
  type User,
  type ConfigureProfileFormStore,
} from "../../../lib";

export type RoleFieldProps = {
  roles: SingleSelectOption[];
  user: Nullable<User>;
};

const selector = (state: ConfigureProfileFormStore) => ({
  role: state.fields.role,
  setFieldValue: state.setFieldValue,
  roleError: state.errors.role,
});

export const RoleField = (props: RoleFieldProps) => {
  const { roles, user } = props;
  const { role, setFieldValue, roleError } = useConfigureProfileFormStore(
    selector,
    shallow
  );

  const selectedRoleOption = useMemo(() => {
    return roles.find((e) => e.value === role) || null;
  }, [roles, role]);

  const currentRoleOption = useMemo(() => {
    return roles.find((e) => e.value === user?.role) || null;
  }, [roles, user]);

  return (
    <div className="w-[287px]">
      <BasicSingleSelect
        id="role"
        label="Role"
        additionalMessageOnLabel="(optional)"
        key="role"
        required={true}
        options={roles}
        value={selectedRoleOption ? selectedRoleOption : currentRoleOption}
        error={roleError}
        onChange={(option) =>
          setFieldValue("role", option ? option.value.toString() : null)
        }
      />
    </div>
  );
};
