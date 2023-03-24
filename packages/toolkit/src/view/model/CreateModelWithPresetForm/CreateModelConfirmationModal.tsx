import axios from "axios";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  NoBgSquareProgress,
  OutlineButton,
  ProgressMessageBoxState,
  SolidButton,
  ModalRoot,
} from "@instill-ai/design-system";
import {
  checkCreateModelOperationUntilDone,
  getModelQuery,
  listModelInstancesQuery,
  getInstillApiErrorMessage,
  useCreateGithubModel,
  useCreateHuggingFaceModel,
  sendAmplitudeData,
  useAmplitudeCtx,
  useModalStore,
  useCreateResourceFormStore,
  ModalStore,
  CreateResourceFormStore,
  type CreateHuggingFaceModelPayload,
  type CreateGithubModelPayload,
  type Model,
  type ModelInstance,
  Nullable,
} from "../../../lib";
import { shallow } from "zustand/shallow";

export type CreateModelConfirmationModalProps = {
  setErrorMessageBoxState: Dispatch<SetStateAction<ProgressMessageBoxState>>;
  accessToken: Nullable<string>;
};

const modalSelector = (state: ModalStore) => ({
  modalIsOpen: state.modalIsOpen,
  closeModal: state.closeModal,
});

const modelSelector = (state: CreateResourceFormStore) => ({
  modelId: state.fields.model.new.id,
  modelDefinition: state.fields.model.new.definition,
  modelDescription: state.fields.model.new.description,
  githubModelRepoUrl: state.fields.model.new.github.repoUrl,
  huggingFaceModelRepoUrl: state.fields.model.new.huggingFace.repoUrl,
  setFieldValue: state.setFieldValue,
  t: state.fields.model.new.modelIsSet,
});

export const CreateModelConfirmationModal = ({
  setErrorMessageBoxState,
  accessToken,
}: CreateModelConfirmationModalProps) => {
  const { amplitudeIsInit } = useAmplitudeCtx();
  const queryClient = useQueryClient();

  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const { modalIsOpen, closeModal } = useModalStore(modalSelector, shallow);

  const {
    modelId,
    modelDescription,
    modelDefinition,
    githubModelRepoUrl,
    huggingFaceModelRepoUrl,
    setFieldValue,
  } = useCreateResourceFormStore(modelSelector, shallow);

  const [isDeploying, setIsDeploying] = useState(false);

  /* -------------------------------------------------------------------------
   * Handle create model
   * -----------------------------------------------------------------------*/

  const prepareNewModel = useCallback(
    async (modelName: string) => {
      const model = await getModelQuery({ modelName, accessToken });
      const modelInstances = await listModelInstancesQuery({
        modelName,
        pageSize: 10,
        nextPageToken: null,
        accessToken,
      });

      queryClient.setQueryData<Model>(["models", model.id], model);
      queryClient.setQueryData<Model[]>(["models"], (old) =>
        old ? [...old, model] : [model]
      );

      queryClient.setQueryData<ModelInstance[]>(
        ["models", modelName, "modelInstances"],
        modelInstances
      );

      setIsDeploying(false);

      if (amplitudeIsInit) {
        sendAmplitudeData("create_github_model", {
          type: "critical_action",
          process: "model",
        });
      }
      setFieldValue("model.type", "new");
      setFieldValue("model.new.modelIsSet", true);
      closeModal();
    },
    [amplitudeIsInit, queryClient, closeModal, setFieldValue, accessToken]
  );

  const createGithubModel = useCreateGithubModel();
  const createHuggingFaceModel = useCreateHuggingFaceModel();

  const handelCreateModel = useCallback(async () => {
    if (!modelId) {
      return;
    }

    setIsDeploying(true);

    if (modelDefinition === "model-definitions/github") {
      if (!githubModelRepoUrl) return;
      const payload: CreateGithubModelPayload = {
        id: modelId,
        model_definition: "model-definitions/github",
        description: modelDescription ?? null,
        configuration: {
          repository: githubModelRepoUrl,
        },
      };

      createGithubModel.mutate(
        { payload, accessToken },
        {
          onSuccess: async ({ operation }) => {
            if (!modelId) return;
            const operationIsDone = await checkCreateModelOperationUntilDone({
              operationName: operation.name,
              accessToken,
            });

            if (operationIsDone) {
              await prepareNewModel(`models/${modelId.trim()}`);
            }
          },
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              setErrorMessageBoxState({
                activate: true,
                status: "error",
                description: getInstillApiErrorMessage(error),
                message: error.message,
              });
            } else {
              setErrorMessageBoxState({
                activate: true,
                status: "error",
                description: null,
                message: "Something went wrong when create the GitHub model",
              });
            }
            closeModal();
            setIsDeploying(false);
          },
        }
      );
    } else if (modelDefinition === "model-definitions/huggingface") {
      if (!huggingFaceModelRepoUrl) return;
      const payload: CreateHuggingFaceModelPayload = {
        id: modelId,
        model_definition: "model-definitions/huggingface",
        description: modelDescription ?? null,
        configuration: {
          repo_id: huggingFaceModelRepoUrl,
        },
      };

      createHuggingFaceModel.mutate(
        { payload, accessToken },
        {
          onSuccess: async ({ operation }) => {
            if (!modelId) return;
            const operationIsDone = await checkCreateModelOperationUntilDone({
              operationName: operation.name,
              accessToken,
            });

            if (operationIsDone) {
              await prepareNewModel(`models/${modelId.trim()}`);
            }
          },
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              setErrorMessageBoxState({
                activate: true,
                status: "error",
                description: getInstillApiErrorMessage(error),
                message: error.message,
              });
            } else {
              setErrorMessageBoxState({
                activate: true,
                status: "error",
                description: null,
                message:
                  "Something went wrong when create the HuggingFace model",
              });
            }
            closeModal();
            setIsDeploying(false);
          },
        }
      );
    }
  }, [
    createGithubModel,
    createHuggingFaceModel,
    modelId,
    modelDescription,
    prepareNewModel,
    githubModelRepoUrl,
    huggingFaceModelRepoUrl,
    modelDefinition,
    closeModal,
    setErrorMessageBoxState,
    accessToken,
  ]);

  return (
    <ModalRoot
      open={modalIsOpen}
      modalBgColor="bg-white"
      modalPadding="p-5"
      dataTestId="delete-resource-modal"
    >
      <div className="flex flex-col gap-y-7">
        <div className="flex flex-row gap-x-2">
          <div className="flex h-8 w-8 rounded-full bg-[#FFFCE3]">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="m-auto h-5 w-5 fill-[#735301]"
            >
              <path d="M2.27067 17.5C1.95123 17.5 1.71512 17.3611 1.56234 17.0833C1.40956 16.8056 1.40956 16.5278 1.56234 16.25L9.27067 2.91667C9.42345 2.63889 9.6665 2.5 9.99984 2.5C10.3332 2.5 10.5762 2.63889 10.729 2.91667L18.4373 16.25C18.5901 16.5278 18.5901 16.8056 18.4373 17.0833C18.2846 17.3611 18.0484 17.5 17.729 17.5H2.27067ZM9.99984 8.33333C9.76373 8.33333 9.56595 8.41305 9.4065 8.5725C9.2465 8.7325 9.1665 8.93056 9.1665 9.16667V11.6667C9.1665 11.9028 9.2465 12.1006 9.4065 12.26C9.56595 12.42 9.76373 12.5 9.99984 12.5C10.2359 12.5 10.434 12.42 10.594 12.26C10.7534 12.1006 10.8332 11.9028 10.8332 11.6667V9.16667C10.8332 8.93056 10.7534 8.7325 10.594 8.5725C10.434 8.41305 10.2359 8.33333 9.99984 8.33333ZM9.99984 15C10.2359 15 10.434 14.92 10.594 14.76C10.7534 14.6006 10.8332 14.4028 10.8332 14.1667C10.8332 13.9306 10.7534 13.7328 10.594 13.5733C10.434 13.4133 10.2359 13.3333 9.99984 13.3333C9.76373 13.3333 9.56595 13.4133 9.4065 13.5733C9.2465 13.7328 9.1665 13.9306 9.1665 14.1667C9.1665 14.4028 9.2465 14.6006 9.4065 14.76C9.56595 14.92 9.76373 15 9.99984 15ZM3.70817 15.8333H16.2915L9.99984 5L3.70817 15.8333Z" />
            </svg>
          </div>
          <h2 className="my-auto text-instill-h2">Irreversible Action</h2>
        </div>
        <p className="text-instill-h3">
          You are about to create a new model, this is an irreversible action
          that cannot be undone. Are you sure you want to proceed?
        </p>
        <ul className="list-inside list-disc">
          <li className="text-instill-h3">
            To confirm, click the &quot;Confirm&quot; button.
          </li>
          <li className="text-instill-h3">
            To cancel, click the &quot;Cancel&quot; button.
          </li>
        </ul>
        <div className="ml-auto flex flex-row gap-x-2">
          {isDeploying ? (
            <NoBgSquareProgress blockSize={38} isLoading={true} />
          ) : null}
          <OutlineButton
            type="button"
            disabled={false}
            onClickHandler={() => closeModal()}
            color="secondary"
            hoveredShadow={null}
          >
            <p className="m-auto text-instill-body">Cancel</p>
          </OutlineButton>
          <SolidButton
            type="button"
            onClickHandler={() => handelCreateModel()}
            hoveredShadow={null}
            color="primary"
          >
            <p className="m-auto text-instill-bold-body">Confirm</p>
          </SolidButton>
        </div>
      </div>
    </ModalRoot>
  );
};
