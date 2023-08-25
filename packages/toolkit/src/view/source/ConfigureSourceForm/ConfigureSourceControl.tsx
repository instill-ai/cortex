import axios from "axios";
import * as React from "react";
import { shallow } from "zustand/shallow";

import {
  BasicProgressMessageBox,
  Button,
  Icons,
  OutlineButton,
  ProgressMessageBoxState,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useConfigureSourceFormStore,
  useModalStore,
  useDeleteConnectorResource,
  useAmplitudeCtx,
  getInstillApiErrorMessage,
  sendAmplitudeData,
  testConnectorResourceConnectionAction,
  type ModalStore,
  type Nullable,
  type ConfigureSourceFormStore,
  type ConnectorResourceWithWatchState,
} from "../../../lib";

import { DeleteResourceModal } from "../../../components";

const selector = (state: ConfigureSourceFormStore) => ({
  init: state.init,
  canEdit: state.fields.canEdit,
  setFieldValue: state.setFieldValue,
});

const modalSelector = (state: ModalStore) => ({
  closeModal: state.closeModal,
  openModal: state.openModal,
});

export type ConfigureSourceControlProps = {
  source: ConnectorResourceWithWatchState;
  onDelete: Nullable<(initStore: () => void) => void>;
  onConfigure: Nullable<(initStore: () => void) => void>;
  accessToken: Nullable<string>;
  disabledDelete?: boolean;
  disabledConfigure?: boolean;
};

export const ConfigureSourceControl = (props: ConfigureSourceControlProps) => {
  const {
    source,
    onDelete,
    onConfigure,
    accessToken,
    disabledDelete,
    disabledConfigure,
  } = props;
  const { amplitudeIsInit } = useAmplitudeCtx();
  const { canEdit, setFieldValue, init } = useConfigureSourceFormStore(
    selector,
    shallow
  );

  // We will disable all the fields if the connector is public (which mean
  // it is provided by Instill AI)
  let disabledAll = false;
  if ("visibility" in source && source.visibility === "VISIBILITY_PUBLIC") {
    disabledAll = true;
  }

  /* -------------------------------------------------------------------------
   * Handle configure source
   * -----------------------------------------------------------------------*/

  const handleConfigureSource = React.useCallback(() => {
    if (canEdit) {
      setFieldValue("canEdit", false);
    } else {
      setFieldValue("canEdit", true);
    }
    if (onConfigure) onConfigure(init);
  }, [canEdit, setFieldValue, init, onConfigure]);

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

  const deleteSource = useDeleteConnectorResource();
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
        connectorResourceName: source.name,
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
          if (onDelete) onDelete(init);
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
    init,
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
      const state = await testConnectorResourceConnectionAction({
        connectorResourceName: source.name,
        accessToken,
      });

      setMessageBoxState(() => ({
        activate: true,
        status: state === "STATE_ERROR" ? "error" : "success",
        description: null,
        message: `The source's state is ${state}`,
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
    <>
      <div className="flex flex-col">
        <div className="mb-10 flex flex-row items-center">
          <div className="flex flex-row items-center space-x-5 mr-auto">
            <SolidButton
              type="button"
              disabled={false}
              color="primary"
              onClickHandler={handleTestSource}
            >
              Test
            </SolidButton>
            <Button
              className="gap-x-2 !rounded-none"
              variant="primary"
              size="lg"
              type="button"
              disabled={true}
            >
              {source.watchState === "STATE_CONNECTED"
                ? "Disconnect"
                : "Connect"}
              {source.watchState === "STATE_CONNECTED" ||
              source.watchState === "STATE_ERROR" ? (
                <Icons.Stop className="h-4 w-4 fill-semantic-fg-on-default stroke-semantic-fg-on-default group-disabled:fill-semantic-fg-disabled group-disabled:stroke-semantic-fg-disabled" />
              ) : (
                <Icons.Play className="h-4 w-4 fill-semantic-fg-on-default stroke-semantic-fg-on-default group-disabled:fill-semantic-fg-disabled group-disabled:stroke-semantic-fg-disabled" />
              )}
            </Button>
            <SolidButton
              type="submit"
              disabled={
                disabledAll ? disabledAll : disabledConfigure ? true : false
              }
              color="primary"
              onClickHandler={handleConfigureSource}
            >
              {canEdit ? "Save" : "Edit"}
            </SolidButton>
          </div>

          <OutlineButton
            disabled={disabledAll ? disabledAll : disabledDelete ? true : false}
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
      </div>
      <DeleteResourceModal
        resource={source}
        handleDeleteResource={handleDeleteSource}
      />
    </>
  );
};
