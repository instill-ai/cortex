import { SolidButton } from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";
import {
  CreateResourceFormStore,
  useCreateResourceFormStore,
  useModalStore,
  validateResourceId,
} from "../../../../lib";

const selector = (state: CreateResourceFormStore) => ({
  modelId: state.fields.model.new.id,
  modelDefinition: state.fields.model.new.definition,
  setFieldError: state.setFieldError,
});

export const ModelBasicInputControl = () => {
  const { modelId, setFieldError, modelDefinition } =
    useCreateResourceFormStore(selector, shallow);

  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="flex">
      <SolidButton
        disabled={modelId ? (modelDefinition ? false : true) : true}
        onClickHandler={() => {
          if (!modelId || !modelDefinition) return;
          if (!validateResourceId(modelId)) {
            setFieldError(
              "model.new.id",
              "Resource ID restricts to lowercase letters, numbers, and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum."
            );
          }
          openModal();
        }}
        position="ml-auto mb-auto"
        type="button"
        color="primary"
      >
        Set up
      </SolidButton>
    </div>
  );
};
