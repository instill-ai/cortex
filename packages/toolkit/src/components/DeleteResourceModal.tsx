import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import {
  BasicTextField,
  OutlineButton,
  ModalRoot,
} from "@instill-ai/design-system";
import {
  useModalStore,
  type DestinationWithDefinition,
  type Model,
  type Pipeline,
  type SourceWithDefinition,
  type Nullable,
  type ModalStore,
} from "../lib";

export type DeleteResourceModalProps = {
  resource: Nullable<
    SourceWithDefinition | DestinationWithDefinition | Pipeline | Model
  >;
  handleDeleteResource: () => void;
};

const selector = (state: ModalStore) => ({
  open: state.modalIsOpen,
  closeModal: state.closeModal,
});

export const DeleteResourceModal = ({
  resource,
  handleDeleteResource,
}: DeleteResourceModalProps) => {
  const { closeModal, open } = useModalStore(selector, shallow);

  const modalDetails = useMemo<{ title: string; description: string }>(() => {
    if (!resource) {
      return {
        title: "",
        description: "",
      };
    }

    const resourcePrefix = resource.name.split("/")[0];
    let title: string;
    let description: string;

    switch (resourcePrefix) {
      case "pipelines": {
        title = "Delete This Pipeline";
        description =
          "This action cannot be undone. This will permanently delete the pipeline.";
        break;
      }

      case "source-connectors": {
        title = "Delete This Source";
        description =
          "This action cannot be undone. This will permanently delete the source.";
        break;
      }

      case "destination-connectors": {
        title = "Delete This Destination";
        description =
          "This action cannot be undone. This will permanently delete the destination.";
        break;
      }

      case "models": {
        if (resource.name.split("/")[2]) {
          title = "Delete This Model Instance";
          description =
            "This action cannot be undone. This will permanently delete the model instance.";
          break;
        } else {
          title = "Delete This Model";
          description =
            "This action cannot be undone. This will permanently delete the model.";
          break;
        }
      }

      default: {
        title = "Delete resource";
        description =
          "Something went wrong when try to activate the flow of deleting resource, please contact our support.";
        console.error(
          "You have passed resource not included in Pipeline, Model and Connector"
        );
      }
    }

    return {
      title,
      description,
    };
  }, [resource]);

  // ###################################################################
  // #                                                                 #
  // # Check whether confirmation code is correct                      #
  // #                                                                 #
  // ###################################################################

  const [confirmationCode, setConfirmationCode] =
    useState<Nullable<string>>(null);

  useEffect(() => {
    setConfirmationCode(null);
  }, [open]);

  const handleCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setConfirmationCode(event.target.value);
    },
    []
  );

  const canDeleteResource = useMemo(() => {
    if (!resource || confirmationCode !== resource.id) return false;
    return true;
  }, [confirmationCode, resource]);

  return (
    <ModalRoot
      open={open}
      modalBgColor="bg-white"
      modalPadding="p-5"
      dataTestId="delete-resource-modal"
    >
      <div className="flex flex-col gap-y-5">
        <h2 className="text-instill-h2">{modalDetails.title}</h2>
        <p>{modalDetails.description}</p>
        <BasicTextField
          id="confirmationCode"
          type="text"
          label={`Please type "${resource ? resource.id : ""}" to confirm.`}
          onChange={handleCodeChange}
          value={confirmationCode}
        />
        <div className="grid grid-cols-2 gap-x-5">
          <OutlineButton
            type="button"
            disabled={false}
            onClickHandler={() => closeModal()}
            color="secondary"
            hoveredShadow={null}
          >
            <p className="mx-auto">Cancel</p>
          </OutlineButton>
          <OutlineButton
            type="button"
            onClickHandler={handleDeleteResource}
            color="danger"
            disabled={canDeleteResource ? false : true}
            hoveredShadow={null}
          >
            <p className="mx-auto">Delete</p>
          </OutlineButton>
        </div>
      </div>
    </ModalRoot>
  );
};
