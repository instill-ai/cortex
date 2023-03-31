import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { shallow } from "zustand/shallow";
import {
  OutlineButton,
  ProgressMessageBoxState,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useConfigurePipelineFormStore,
  useCreateUpdateDeleteResourceGuard,
  useModalStore,
  useUpdatePipeline,
  type Pipeline,
  type Nullable,
  type ConfigurePipelineFormStore,
  getInstillApiErrorMessage,
} from "../../../lib";

const selector = (state: ConfigurePipelineFormStore) => ({
  setFieldValue: state.setFieldValue,
  canEdit: state.fields.canEdit,
  pipelineDescription: state.fields.pipelineDescription,
  initConfigurePipelineFormStore: state.init,
});

export type ConfigurePipelineFormControlProps = {
  pipeline: Nullable<Pipeline>;
  setMessageBoxState: Dispatch<SetStateAction<ProgressMessageBoxState>>;
  onConfigure: Nullable<() => void>;
  accessToken: Nullable<string>;
};

export const ConfigurePipelineFormControl = (
  props: ConfigurePipelineFormControlProps
) => {
  const { pipeline, setMessageBoxState, onConfigure, accessToken } = props;
  const enable = useCreateUpdateDeleteResourceGuard();
  const {
    canEdit,
    pipelineDescription,
    setFieldValue,
    initConfigurePipelineFormStore,
  } = useConfigurePipelineFormStore(selector, shallow);
  const openModal = useModalStore((state) => state.openModal);
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

    setMessageBoxState({
      activate: true,
      status: "progressing",
      description: null,
      message: "Updating...",
    });

    updatePipeline.mutate(
      {
        payload: {
          name: pipeline.name,
          description: pipelineDescription ?? null,
        },
        accessToken,
      },
      {
        onSuccess: () => {
          setFieldValue("canEdit", false);
          initConfigurePipelineFormStore();

          if (onConfigure) onConfigure();

          setMessageBoxState({
            activate: true,
            status: "success",
            description: null,
            message: "Succeed.",
          });
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setMessageBoxState({
              activate: true,
              status: "error",
              description: getInstillApiErrorMessage(error),
              message: error.message,
            });
          } else {
            setMessageBoxState({
              activate: true,
              status: "error",
              description: null,
              message: "Something went wrong when update the pipeline",
            });
          }
        },
      }
    );
  }, [
    canEdit,
    pipelineDescription,
    updatePipeline,
    pipeline,
    setFieldValue,
    setMessageBoxState,
    initConfigurePipelineFormStore,
    onConfigure,
    accessToken,
  ]);

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
