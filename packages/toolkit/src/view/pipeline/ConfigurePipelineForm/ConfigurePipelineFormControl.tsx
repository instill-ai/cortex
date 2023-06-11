import axios from "axios";
import * as React from "react";
import { shallow } from "zustand/shallow";
import {
  OutlineButton,
  ProgressMessageBoxState,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useConfigurePipelineFormStore,
  useModalStore,
  useUpdatePipeline,
  getInstillApiErrorMessage,
  sendAmplitudeData,
  useAmplitudeCtx,
  useDeletePipeline,
  type Pipeline,
  type Nullable,
  type ConfigurePipelineFormStore,
} from "../../../lib";
import { DeleteResourceModal } from "../../../components";

const selector = (state: ConfigurePipelineFormStore) => ({
  setFieldValue: state.setFieldValue,
  canEdit: state.fields.canEdit,
  pipelineDescription: state.fields.pipelineDescription,
  init: state.init,
});

export type ConfigurePipelineFormControlProps = {
  accessToken: Nullable<string>;
  pipeline: Nullable<Pipeline>;
  setMessageBoxState: React.Dispatch<
    React.SetStateAction<ProgressMessageBoxState>
  >;
  onDelete: Nullable<(initStore: () => void) => void>;
  onConfigure: Nullable<(initStore: () => void) => void>;

  /**
   * - Default is false
   */
  disabledConfigure?: boolean;

  /**
   * - Default is false
   */
  disabledDelete?: boolean;
};

export const ConfigurePipelineFormControl = (
  props: ConfigurePipelineFormControlProps
) => {
  const {
    pipeline,
    setMessageBoxState,
    onConfigure,
    onDelete,
    accessToken,
    disabledConfigure,
    disabledDelete,
  } = props;

  const { canEdit, pipelineDescription, setFieldValue, init } =
    useConfigurePipelineFormStore(selector, shallow);

  const { amplitudeIsInit } = useAmplitudeCtx();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const updatePipeline = useUpdatePipeline();

  const handleSubmit = React.useCallback(() => {
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

          if (onConfigure) onConfigure(init);

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
    init,
    onConfigure,
    accessToken,
  ]);

  const deletePipeline = useDeletePipeline();

  const handleDeletePipeline = React.useCallback(() => {
    if (!pipeline) return;

    setMessageBoxState({
      activate: true,
      status: "progressing",
      description: null,
      message: "Deleting...",
    });

    closeModal();

    deletePipeline.mutate(
      { pipelineName: pipeline.name, accessToken },
      {
        onSuccess: () => {
          setMessageBoxState({
            activate: true,
            status: "success",
            description: null,
            message: "Succeed.",
          });
          if (amplitudeIsInit) {
            sendAmplitudeData("delete_pipeline", {
              type: "critical_action",
              process: "destination",
            });
          }
          if (onDelete) onDelete(init);
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
              message: "Something went wrong when delete the pipeline",
            });
          }
        },
      }
    );
  }, [
    init,
    pipeline,
    amplitudeIsInit,
    deletePipeline,
    closeModal,
    accessToken,
    setMessageBoxState,
    onDelete,
  ]);

  return (
    <>
      <div className="flex flex-row">
        <OutlineButton
          disabled={disabledDelete ? true : false}
          onClickHandler={() => openModal()}
          position="mr-auto my-auto"
          type="button"
          color="danger"
          hoveredShadow={null}
        >
          Delete
        </OutlineButton>
        <SolidButton
          disabled={disabledConfigure ? true : false}
          onClickHandler={() => handleSubmit()}
          position="ml-auto my-auto"
          type="button"
          color="primary"
        >
          {canEdit ? "Save" : "Edit"}
        </SolidButton>
      </div>
      <DeleteResourceModal
        resource={pipeline}
        handleDeleteResource={handleDeletePipeline}
      />
    </>
  );
};
