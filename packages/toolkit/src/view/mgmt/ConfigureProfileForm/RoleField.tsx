import * as React from "react";
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

  React.useEffect(() => {
    setFieldValue("role", user?.role || null);
  }, [user?.role]);

  const selectedRoleOption = React.useMemo(() => {
    return roles.find((e) => e.value === role) || null;
  }, [roles, role]);

  return (
    <div className="w-[287px]">
      <BasicSingleSelect
        id="profile-role"
        label="Role"
        additionalMessageOnLabel="(optional)"
        key="role"
        required={false}
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
