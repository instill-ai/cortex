import * as React from "react";
import axios from "axios";
import {
  BasicProgressMessageBox,
  ProgressMessageBoxState,
  OutlineButton,
  SolidButton,
  BasicTextArea,
  FormRoot,
} from "@instill-ai/design-system";

import {
  useDeleteModel,
  useUpdateModel,
  sendAmplitudeData,
  useAmplitudeCtx,
  useConfigureModelFormStore,
  useModalStore,
  getInstillApiErrorMessage,
  type Model,
  type Nullable,
  type ConfigureModelFormStore,
  type ModalStore,
} from "../../lib";

import { DeleteResourceModal } from "../../components";
import { shallow } from "zustand/shallow";

export type ConfigureModelFormProps = {
  model: Nullable<Model>;
  marginBottom: Nullable<string>;
  onConfigure: Nullable<() => void>;
  disableConfigure: boolean;
  onDelete: Nullable<() => void>;
  disableDelete: boolean;
};

const formSelector = (state: ConfigureModelFormStore) => ({
  description: state.fields.description,
  init: state.init,
  setFieldValue: state.setFieldValue,
  setFormIsDirty: state.setFormIsDirty,
});

const modalSelector = (state: ModalStore) => ({
  openModal: state.openModal,
  closeModal: state.closeModal,
});

export const ConfigureModelForm = ({
  model,
  marginBottom,
  onConfigure,
  disableConfigure,
  onDelete,
  disableDelete,
}: ConfigureModelFormProps) => {
  const { amplitudeIsInit } = useAmplitudeCtx();
  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const { description, init, setFieldValue, setFormIsDirty } =
    useConfigureModelFormStore(formSelector, shallow);

  const { openModal, closeModal } = useModalStore(modalSelector, shallow);

  /* -------------------------------------------------------------------------
   * Handle update model
   * -----------------------------------------------------------------------*/

  const [canEdit, setCanEdit] = React.useState(false);

  const [messageBoxState, setMessageBoxState] =
    React.useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const updateModel = useUpdateModel();

  const handleConfigureModel = React.useCallback(() => {
    if (!canEdit) {
      setCanEdit(true);
      return;
    }

    if (!model) {
      setCanEdit(false);
      return;
    }

    if (model.description === description) {
      setCanEdit(false);
      return;
    }

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Updating...",
    }));

    updateModel.mutate(
      {
        payload: {
          name: model.name,
          description: description || "",
        },
        accessToken: null,
      },
      {
        onSuccess: () => {
          setCanEdit(false);

          setMessageBoxState(() => ({
            activate: true,
            status: "success",
            description: null,
            message: "Succeed.",
          }));

          init();

          if (onConfigure) {
            onConfigure();
          }

          if (amplitudeIsInit) {
            sendAmplitudeData("update_model", {
              type: "critical_action",
              process: "model",
            });
          }
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: getInstillApiErrorMessage(error),
              message: error.message,
            }));
          } else {
            setMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: null,
              message: "Something went wrong when update the model",
            }));
          }
        },
      }
    );
  }, [
    amplitudeIsInit,
    model,
    updateModel,
    description,
    canEdit,
    init,
    onConfigure,
  ]);

  /* -------------------------------------------------------------------------
   * Handle delete model
   * -----------------------------------------------------------------------*/

  const deleteModel = useDeleteModel();
  const handleDeleteModel = React.useCallback(() => {
    if (!model) return;

    setMessageBoxState({
      activate: true,
      message: "Deleting...",
      description: null,
      status: "progressing",
    });

    closeModal();

    deleteModel.mutate(
      {
        modelName: model.name,
        accessToken: null,
      },
      {
        onSuccess: () => {
          setMessageBoxState({
            activate: true,
            message: "Succeed.",
            description: null,
            status: "success",
          });
          if (amplitudeIsInit) {
            sendAmplitudeData("delete_model", {
              type: "critical_action",
              process: "model",
            });
          }

          if (onDelete) {
            onDelete();
          }
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setMessageBoxState({
              activate: true,
              message: `${error.response?.status} - ${error.response?.data.message}`,
              description: getInstillApiErrorMessage(error),
              status: "error",
            });
          } else {
            setMessageBoxState({
              activate: true,
              message: "Something went wrong when delete the model",
              description: null,
              status: "error",
            });
          }
        },
      }
    );
  }, [model, amplitudeIsInit, deleteModel, closeModal, onDelete]);

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <>
      <FormRoot marginBottom={marginBottom} formLess={false} width={null}>
        <div className="mb-10 flex flex-col">
          <BasicTextArea
            id="model-description"
            name="description"
            label="Description"
            description="Fill with a short description."
            value={description ? description : model?.description || null}
            disabled={canEdit ? false : true}
            required={false}
            onChange={(event) => {
              setFieldValue("description", event.target.value);
              setFormIsDirty(true);
            }}
          />
        </div>
        <div className="mb-8 flex flex-row">
          <OutlineButton
            disabled={disableDelete ? true : false}
            onClickHandler={() => openModal()}
            position="mr-auto my-auto"
            type="button"
            color="danger"
            hoveredShadow={null}
          >
            Delete
          </OutlineButton>
          <SolidButton
            disabled={disableConfigure ? true : false}
            onClickHandler={handleConfigureModel}
            position="ml-auto my-auto"
            type="button"
            color="primary"
          >
            {canEdit ? "Save" : "Edit"}
          </SolidButton>
        </div>
        <div className="flex flex-row">
          <BasicProgressMessageBox
            state={messageBoxState}
            setActivate={(activate) =>
              setMessageBoxState((prev) => ({ ...prev, activate }))
            }
            width="w-[25vw]"
            closable={true}
          />
        </div>
      </FormRoot>
      <DeleteResourceModal
        resource={model}
        handleDeleteResource={handleDeleteModel}
      />
    </>
  );
};
