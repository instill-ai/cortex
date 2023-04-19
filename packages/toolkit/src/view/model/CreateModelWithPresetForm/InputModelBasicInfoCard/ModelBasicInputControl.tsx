import * as React from "react";
import {
  BasicProgressMessageBox,
  SolidButton,
  ProgressMessageBoxState,
} from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";
import { useQueryClient } from "@tanstack/react-query";
import {
  CreateGithubModelPayload,
  CreateHuggingFaceModelPayload,
  CreateResourceFormStore,
  Model,
  Nullable,
  checkCreateModelStateUntilOffline,
  getInstillApiErrorMessage,
  getModelQuery,
  sendAmplitudeData,
  useAmplitudeCtx,
  useCreateGithubModel,
  useCreateHuggingFaceModel,
  useCreateResourceFormStore,
  useDeployModel,
  validateResourceId,
  watchModel,
} from "../../../../lib";
import axios from "axios";
import { checkUntilOperationIsDoen } from "../../../../lib/vdp-sdk/operation";

const selector = (state: CreateResourceFormStore) => ({
  modelId: state.fields.model.new.id,
  modelDefinition: state.fields.model.new.definition,
  modelDescription: state.fields.model.new.description,
  githubModelRepoUrl: state.fields.model.new.github.repoUrl,
  githubModelTag: state.fields.model.new.github.tag,
  huggingFaceModelRepoUrl: state.fields.model.new.huggingFace.repoUrl,
  setFieldValue: state.setFieldValue,
  setFieldError: state.setFieldError,
  init: state.init,
});

type ModelBasicInputControlProps = {
  accessToken: Nullable<string>;
  onCreate: Nullable<() => void>;
  initStoreOnCreate: boolean;
};

export const ModelBasicInputControl = ({
  accessToken,
  onCreate,
  initStoreOnCreate,
}: ModelBasicInputControlProps) => {
  const { amplitudeIsInit } = useAmplitudeCtx();
  const queryClient = useQueryClient();

  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const {
    modelId,
    modelDescription,
    modelDefinition,
    githubModelRepoUrl,
    githubModelTag,
    huggingFaceModelRepoUrl,
    setFieldValue,
    setFieldError,
    init,
  } = useCreateResourceFormStore(selector, shallow);

  const [createModelMessageBoxState, setCreateModelMessageBoxState] =
    React.useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  /* -------------------------------------------------------------------------
   * Handle create model
   * -----------------------------------------------------------------------*/

  const prepareNewModel = React.useCallback(
    async (modelName: string) => {
      const model = await getModelQuery({ modelName, accessToken });
      queryClient.setQueryData<Model>(["models", model.id], model);
      queryClient.setQueryData<Model[]>(["models"], (old) =>
        old ? [...old, model] : [model]
      );

      if (amplitudeIsInit) {
        sendAmplitudeData("create_github_model", {
          type: "critical_action",
          process: "model",
        });
      }
      setFieldValue("model.type", "new");
      setFieldValue("model.new.modelIsSet", true);
    },
    [amplitudeIsInit, queryClient, setFieldValue, accessToken]
  );

  const createGithubModel = useCreateGithubModel();
  const createHuggingFaceModel = useCreateHuggingFaceModel();
  const deployModel = useDeployModel();

  const handelCreateModel = React.useCallback(async () => {
    if (!modelId) {
      return;
    }

    setCreateModelMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Creating...",
    }));

    if (modelDefinition === "model-definitions/github") {
      if (!githubModelRepoUrl || !githubModelTag) return;
      const payload: CreateGithubModelPayload = {
        id: modelId,
        model_definition: "model-definitions/github",
        description: modelDescription ?? null,
        configuration: {
          repository: githubModelRepoUrl,
          tag: githubModelTag,
        },
      };

      createGithubModel.mutate(
        { payload, accessToken },
        {
          onSuccess: async ({ operation }) => {
            if (!modelId) return;
            const operationIsDone = await checkUntilOperationIsDoen({
              operationName: operation.name,
              accessToken,
            });

            if (operationIsDone) {
              const modelName = `models/${modelId.trim()}`;
              const modelState = await watchModel({ modelName, accessToken });

              if (modelState.state === "STATE_ERROR") {
                setCreateModelMessageBoxState(() => ({
                  activate: true,
                  status: "error",
                  description: "Something went wrong when create the model",
                  message: "Create Model Failed",
                }));
                return;
              }

              await prepareNewModel(modelName);
              deployModel.mutate({ modelName, accessToken });

              setCreateModelMessageBoxState({
                activate: true,
                status: "success",
                description: null,
                message: "Succeed.",
              });

              if (initStoreOnCreate) {
                init();
              }

              if (onCreate) {
                onCreate();
              }
            }
          },
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              setCreateModelMessageBoxState({
                activate: true,
                status: "error",
                description: getInstillApiErrorMessage(error),
                message: error.message,
              });
            } else {
              setCreateModelMessageBoxState({
                activate: true,
                status: "error",
                description: null,
                message: "Something went wrong when create the GitHub model",
              });
            }
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
          onSuccess: async () => {
            if (!modelId) return;
            const operationIsDone = await checkCreateModelStateUntilOffline({
              modelName: `models/${modelId.trim()}`,
              accessToken,
            });

            if (operationIsDone) {
              await prepareNewModel(`models/${modelId.trim()}`);
            }

            setCreateModelMessageBoxState({
              activate: true,
              status: "success",
              description: null,
              message: "Succeed.",
            });

            if (initStoreOnCreate) {
              init();
            }

            if (onCreate) {
              onCreate();
            }
          },
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              setCreateModelMessageBoxState({
                activate: true,
                status: "error",
                description: getInstillApiErrorMessage(error),
                message: error.message,
              });
            } else {
              setCreateModelMessageBoxState({
                activate: true,
                status: "error",
                description: null,
                message:
                  "Something went wrong when create the HuggingFace model",
              });
            }
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
    accessToken,
    init,
    deployModel,
    onCreate,
    githubModelTag,
    initStoreOnCreate,
  ]);

  return (
    <div className="flex flex-row">
      <div className="my-auto">
        <BasicProgressMessageBox
          state={createModelMessageBoxState}
          setActivate={(activate) =>
            setCreateModelMessageBoxState((prev) => ({
              ...prev,
              activate,
            }))
          }
          width="w-[25vw]"
          closable={true}
        />
      </div>
      <SolidButton
        disabled={modelId ? (modelDefinition ? false : true) : true}
        onClickHandler={() => {
          if (!modelId || !modelDefinition) return;
          if (!validateResourceId(modelId)) {
            setFieldError(
              "model.new.id",
              "Resource ID restricts to lowercase letters, numbers, and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum."
            );
          }
          handelCreateModel();
        }}
        position="ml-auto mb-auto"
        type="button"
        color="primary"
      >
        Set up
      </SolidButton>
    </div>
  );
};
