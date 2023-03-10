import { Nullable } from "@instill-ai/toolkit";
import { FormRoot } from "@instill-ai/design-system";
import { FirstNameField } from "./FirstNameField";
import { LastNameField } from "./LastNameField";
import { OrgNameField } from "./OrgNameField";
import { RoleField } from "./RoleField";
import { UserNameField } from "./UserNameField";
import { SingleSelectOption } from "@instill-ai/design-system";
import { NewsletterSubscriptionField } from "./NewsletterSubscriptionField";
import { ConfigureProfileControl } from "./ConfigureProfileControl";

export type ConfigureProfileFormProps = {
  marginBottom: Nullable<string>;
  roles: SingleSelectOption[];
  width: Nullable<string>;
};

export const ConfigureProfileForm = ({
  marginBottom,
  roles,
  width,
}: ConfigureProfileFormProps) => {
  return (
    <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
      <div className="mb-6 flex flex-row p-10">
        <div className="h-16 w-16 rounded-full bg-instillGrey20">{}</div>
      </div>
      <div className="mb-8 flex flex-col gap-y-6">
        <div className="flex flex-row gap-x-6">
          <FirstNameField />
          <LastNameField />
        </div>
        <UserNameField />
        <OrgNameField />
        <RoleField roles={roles} />
        <NewsletterSubscriptionField />
      </div>
      <ConfigureProfileControl />
    </FormRoot>
  );
};
