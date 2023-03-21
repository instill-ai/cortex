import axios from "axios";
import { useCallback, useState } from "react";
import { shallow } from "zustand/shallow";
import {
  BasicProgressMessageBox,
  OutlineButton,
  ProgressMessageBoxState,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useConfigureSourceFormStore,
  useCreateUpdateDeleteResourceGuard,
  useModalStore,
  useDeleteSource,
  useAmplitudeCtx,
  getInstillApiErrorMessage,
  sendAmplitudeData,
  ModalStore,
  type Nullable,
  type SourceWithPipelines,
  type ConfigureSourceFormStore,
} from "../../../lib";

import { DeleteResourceModal } from "../../DeleteResourceModal";

const selector = (state: ConfigureSourceFormStore) => ({
  canEdit: state.fields.canEdit,
  setFieldValue: state.setFieldValue,
});

const modalSelector = (state: ModalStore) => ({
  closeModal: state.closeModal,
  openModal: state.openModal,
});

export type ConfigurePipelineControlProps = {
  source: Nullable<SourceWithPipelines>;
  onDeleteCallback: Nullable<() => void>;
};

export const ConfigureSourceControl = ({
  source,
  onDeleteCallback,
}: ConfigurePipelineControlProps) => {
  const { amplitudeIsInit } = useAmplitudeCtx();
  const enableGuard = useCreateUpdateDeleteResourceGuard();
  const { canEdit, setFieldValue } = useConfigureSourceFormStore(
    selector,
    shallow
  );

  /* -------------------------------------------------------------------------
   * Handle configure source
   * -----------------------------------------------------------------------*/

  const handleSubmit = useCallback(() => {
    if (canEdit) {
      setFieldValue("canEdit", false);
    } else {
      setFieldValue("canEdit", true);
    }
  }, [canEdit, setFieldValue]);

  /* -------------------------------------------------------------------------
   * Handle delete source
   * -----------------------------------------------------------------------*/

  const { openModal, closeModal } = useModalStore(modalSelector, shallow);
  const [messageBoxState, setMessageBoxState] =
    useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const deleteSource = useDeleteSource();
  const handleDeleteSource = useCallback(() => {
    if (!source) return;

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Deleting...",
    }));

    deleteSource.mutate(
      {
        sourceName: source.name,
        accessToken: null,
      },
      {
        onSuccess: () => {
          setMessageBoxState(() => ({
            activate: true,
            status: "success",
            description: null,
            message: "Succeed.",
          }));

          if (amplitudeIsInit) {
            sendAmplitudeData("delete_source", {
              type: "critical_action",
              process: "source",
            });
          }
          if (onDeleteCallback) onDeleteCallback();
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setMessageBoxState(() => ({
              activate: true,
              message: error.message,
              description: getInstillApiErrorMessage(error),
              status: "error",
            }));
          } else {
            setMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: null,
              message: "Something went wrong when delete the source",
            }));
          }
        },
      }
    );
    closeModal();
  }, [source, amplitudeIsInit, deleteSource, closeModal, onDeleteCallback]);

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <div className="flex flex-col">
      <div className="mb-10 flex flex-row">
        <OutlineButton
          disabled={enableGuard}
          onClickHandler={() => openModal()}
          position="mr-auto my-auto"
          type="button"
          color="danger"
          hoveredShadow={null}
        >
          Delete
        </OutlineButton>
        <SolidButton
          type="submit"
          disabled={true}
          position="ml-auto my-auto"
          color="primary"
          onClickHandler={handleSubmit}
        >
          {canEdit ? "Save" : "Edit"}
        </SolidButton>
      </div>
      <div className="flex">
        <BasicProgressMessageBox
          state={messageBoxState}
          setActivate={(activate) =>
            setMessageBoxState((prev) => ({
              ...prev,
              activate,
            }))
          }
          width="w-[25vw]"
          closable={true}
        />
      </div>
      <DeleteResourceModal
        resource={source}
        handleDeleteResource={handleDeleteSource}
      />
    </div>
  );
};