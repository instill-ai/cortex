import { OutlineButton, SolidButton } from "@instill-ai/design-system";
import { useCreateUpdateDeleteResourceGuard } from "@instill-ai/toolkit";

export const ConfigurePipelineFormControl = () => {
  const enable = useCreateUpdateDeleteResourceGuard();

  return (
    <div className="mb-10 flex flex-row">
      <OutlineButton
        disabled={disableResourceDeletion}
        onClickHandler={() => openModal()}
        position="mr-auto my-auto"
        type="button"
        color="danger"
        hoveredShadow={null}
      >
        Delete
      </OutlineButton>
      <SolidButton
        disabled={false}
        onClickHandler={() => handleSubmit()}
        position="ml-auto my-auto"
        type="button"
        color="primary"
      >
        {canEdit ? "Save" : "Edit"}
      </SolidButton>
    </div>
  );
};
