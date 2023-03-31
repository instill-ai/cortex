import { shallow } from "zustand/shallow";
import { BasicToggleField } from "@instill-ai/design-system";
import {
  useConfigureProfileFormStore,
  type Nullable,
  type User,
  type ConfigureProfileFormStore,
} from "../../../lib";

const selector = (state: ConfigureProfileFormStore) => ({
  newsletterSubscription: state.fields.newsletterSubscription,
  setFieldValue: state.setFieldValue,
});

export type NewsletterSubscriptionFieldProps = {
  user: Nullable<User>;
};

export const NewsletterSubscriptionField = (
  props: NewsletterSubscriptionFieldProps
) => {
  const { user } = props;
  const { newsletterSubscription, setFieldValue } =
    useConfigureProfileFormStore(selector, shallow);

  return (
    <div className="w-full">
      <BasicToggleField
        id="newsletterSubscription"
        label="Newsletter subscription"
        value={
          newsletterSubscription
            ? newsletterSubscription
            : user?.newsletter_subscription || false
        }
        required={true}
        description="Receive the latest news from Instill AI for open source updates, community highlights, blog posts, useful tutorials and more! You can unsubscribe any time."
        onChange={(event) =>
          setFieldValue("newsletterSubscription", event.target.checked)
        }
      />
    </div>
  );
};
