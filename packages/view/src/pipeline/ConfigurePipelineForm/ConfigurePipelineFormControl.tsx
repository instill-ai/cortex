import { OutlineButton, SolidButton } from "@instill-ai/design-system";
import {
  Nullable,
  Pipeline,
  useConfigurePipelineFormStore,
  useCreateUpdateDeleteResourceGuard,
  useModalStore,
  useUpdatePipeline,
  type ConfigurePipelineFormStore,
} from "@instill-ai/toolkit";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";

const selector = (state: ConfigurePipelineFormStore) => ({
  setFieldValue: state.setFieldValue,
  canEdit: state.fields.canEdit,
  pipelineDescription: state.fields.pipelineDescription,
});

export type ConfigurePipelineFormControlProps = {
  pipeline: Nullable<Pipeline>;
};

export const ConfigurePipelineFormControl = ({
  pipeline,
}: ConfigurePipelineFormControlProps) => {
  const enable = useCreateUpdateDeleteResourceGuard();
  const { canEdit, pipelineDescription, setFieldValue } =
    useConfigurePipelineFormStore(selector, shallow);
  const openModal = useModalStore((state) => state.closeModal);
  const updatePipeline = useUpdatePipeline();

  const handleSubmit = useCallback(() => {
    if (!canEdit) {
      setFieldValue("canEdit", true);
      return;
    }

    if (!pipeline) return;

    if (pipeline.description === pipelineDescription) {
      setFieldValue("canEdit", false);
      return;
    }

    // setMessageBoxState(() => ({
    //   activate: true,
    //   status: "progressing",
    //   description: null,
    //   message: "Updating...",
    // }));

    updatePipeline.mutate(
      {
        payload: {
          name: pipeline.name,
          description: pipelineDescription ?? null,
        },
        accessToken: null,
      },
      {
        onSuccess: () => {
          setFieldValue("canEdit", false);
          // setMessageBoxState(() => ({
          //   activate: true,
          //   status: "success",
          //   description: null,
          //   message: "Succeed.",
          // }));
        },
        onError: (error) => {
          if (error instanceof Error) {
            // setMessageBoxState(() => ({
            //   activate: true,
            //   status: "error",
            //   description: null,
            //   message: error.message,
            // }));
          } else {
            // setMessageBoxState(() => ({
            //   activate: true,
            //   status: "error",
            //   description: null,
            //   message: "Something went wrong when update the pipeline",
            // }));
          }
        },
      }
    );
  }, [canEdit, pipelineDescription, updatePipeline, pipeline]);

  return (
    <div className="flex flex-row">
      <OutlineButton
        disabled={enable}
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
