import {
  ConfigureProfileFormStore,
  useConfigureProfileFormStore,
} from "@instill-ai/toolkit";
import { BasicToggleField } from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";

const selector = (state: ConfigureProfileFormStore) => ({
  newsletterSubscription: state.fields.newsletterSubscription,
  setFieldValue: state.setFieldValue,
});

export const NewsletterSubscriptionField = () => {
  const { newsletterSubscription, setFieldValue } =
    useConfigureProfileFormStore(selector, shallow);

  return (
    <div className="w-full">
      <BasicToggleField
        id="newsletterSubscription"
        label="Newsletter subscription"
        value={newsletterSubscription}
        required={true}
        description="Receive the latest news from Instill AI for open source updates, community highlights, blog posts, useful tutorials and more! You can unsubscribe any time."
        onChange={(event) =>
          setFieldValue("newsletterSubscription", event.target.checked)
        }
      />
    </div>
  );
};
