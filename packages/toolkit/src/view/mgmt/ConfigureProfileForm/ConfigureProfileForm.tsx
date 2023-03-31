import type { Nullable, User } from "../../../lib";
import { FirstNameField } from "./FirstNameField";
import { LastNameField } from "./LastNameField";
import { OrgNameField } from "./OrgNameField";
import { RoleField } from "./RoleField";
import { UserNameField } from "./UserNameField";
import { SingleSelectOption, FormRoot } from "@instill-ai/design-system";
import { NewsletterSubscriptionField } from "./NewsletterSubscriptionField";
import { ConfigureProfileControl } from "./ConfigureProfileControl";

export type ConfigureProfileFormProps = {
  user: Nullable<User>;
  marginBottom: Nullable<string>;
  roles: SingleSelectOption[];
  width: Nullable<string>;
};

export const ConfigureProfileForm = (props: ConfigureProfileFormProps) => {
  const { user, marginBottom, roles, width } = props;

  return (
    <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
      <div className="mb-6 flex flex-row py-10">
        <div className="h-16 w-16 rounded-full bg-instillGrey20">{}</div>
      </div>
      <div className="mb-8 flex flex-col gap-y-6">
        <div className="flex flex-row gap-x-6">
          <FirstNameField user={user} />
          <LastNameField user={user} />
        </div>
        <UserNameField user={user} />
        <OrgNameField user={user} />
        <RoleField roles={roles} user={user} />
        <NewsletterSubscriptionField user={user} />
      </div>
      <ConfigureProfileControl />
    </FormRoot>
  );
};
