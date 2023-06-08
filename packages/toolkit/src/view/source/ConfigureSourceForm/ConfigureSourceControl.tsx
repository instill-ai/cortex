import axios from "axios";
import * as React from "react";
import { shallow } from "zustand/shallow";
import {
  BasicProgressMessageBox,
  OutlineButton,
  ProgressMessageBoxState,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useConfigureSourceFormStore,
  useModalStore,
  useDeleteSource,
  useAmplitudeCtx,
  getInstillApiErrorMessage,
  sendAmplitudeData,
  testSourceConnectionAction,
  type ModalStore,
  type Nullable,
  type SourceWithPipelines,
  type ConfigureSourceFormStore,
} from "../../../lib";

import { DeleteResourceModal } from "../../../components";

const selector = (state: ConfigureSourceFormStore) => ({
  canEdit: state.fields.canEdit,
  setFieldValue: state.setFieldValue,
});

const modalSelector = (state: ModalStore) => ({
  closeModal: state.closeModal,
  openModal: state.openModal,
});

export type ConfigureSourceControlProps = {
  source: Nullable<SourceWithPipelines>;
  onDelete: Nullable<() => void>;
  accessToken: Nullable<string>;
  disabledDelete?: boolean;
  disabledConfigure?: boolean;
};

export const ConfigureSourceControl = (props: ConfigureSourceControlProps) => {
  const { source, onDelete, accessToken, disabledDelete, disabledConfigure } =
    props;
  const { amplitudeIsInit } = useAmplitudeCtx();
  const { canEdit, setFieldValue } = useConfigureSourceFormStore(
    selector,
    shallow
  );
  /* -------------------------------------------------------------------------
   * Handle configure source
   * -----------------------------------------------------------------------*/

  const handleSubmit = React.useCallback(() => {
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
    React.useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const deleteSource = useDeleteSource();
  const handleDeleteSource = React.useCallback(() => {
    if (!source) return;

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Deleting...",
    }));

    closeModal();

    deleteSource.mutate(
      {
        sourceName: source.name,
        accessToken,
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
          if (onDelete) onDelete();
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
  }, [
    source,
    amplitudeIsInit,
    deleteSource,
    closeModal,
    onDelete,
    accessToken,
  ]);

  const handleTestSource = async function () {
    if (!source) return;

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Testing...",
    }));

    try {
      const res = await testSourceConnectionAction({
        sourceName: source.name,
        accessToken,
      });

      setMessageBoxState(() => ({
        activate: true,
        status: res.state === "STATE_ERROR" ? "error" : "success",
        description: null,
        message: `The source's state is ${res.state}`,
      }));
    } catch (err) {
      setMessageBoxState(() => ({
        activate: true,
        status: "error",
        description: null,
        message: "Something went wrong when test the source",
      }));
    }
  };

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <div className="flex flex-col">
      <div className="mb-10 flex flex-row items-center">
        <div className="flex flex-row items-center space-x-5 mr-auto">
          <SolidButton
            type="submit"
            disabled={disabledConfigure ? true : false}
            color="primary"
            onClickHandler={handleTestSource}
          >
            Test
          </SolidButton>
          <SolidButton
            type="submit"
            disabled={disabledConfigure ? true : false}
            color="primary"
            onClickHandler={handleSubmit}
          >
            {canEdit ? "Save" : "Edit"}
          </SolidButton>
        </div>

        <OutlineButton
          disabled={disabledDelete ? true : false}
          onClickHandler={() => openModal()}
          position="my-auto"
          type="button"
          color="danger"
          hoveredShadow={null}
        >
          Delete
        </OutlineButton>
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
