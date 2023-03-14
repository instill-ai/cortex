import {
  useConfigureProfileFormStore,
  ConfigureProfileFormState,
  validateConfigureProfileFormFieldSchema,
} from "@instill-ai/toolkit";
import { OutlineButton, SolidButton } from "@instill-ai/design-system";
import { z } from "zod";

export const ConfigureProfileControl = () => {
  const fields = useConfigureProfileFormStore((state) => state.fields);
  const setFieldError = useConfigureProfileFormStore(
    (state) => state.setFieldError
  );

  const handleSubmit = () => {
    try {
      validateConfigureProfileFormFieldSchema(fields);
    } catch (err) {
      if (err instanceof z.ZodError) {
        for (const issue of err.issues) {
          setFieldError(
            issue.path.toString() as keyof ConfigureProfileFormState["errors"],
            issue.message
          );
        }
      }
    }
  };

  return (
    <div className="ml-auto flex flex-row gap-x-2">
      <OutlineButton
        disabled={false}
        onClickHandler={null}
        position="my-auto"
        type="button"
        color="secondary"
        hoveredShadow={null}
      >
        Cancel
      </OutlineButton>
      <SolidButton
        type="button"
        color="primary"
        disabled={false}
        position="my-auto"
        onClickHandler={() => handleSubmit()}
      >
        Save Changes
      </SolidButton>
    </div>
  );
};
