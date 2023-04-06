import axios from "axios";
import { ChangeEvent, useMemo, useState } from "react";
import {
  BasicProgressMessageBox,
  BasicTextArea,
  BasicTextField,
  ProgressMessageBoxState,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useCreatePipeline,
  useUpdatePipeline,
  validateResourceId,
  useAmplitudeCtx,
  sendAmplitudeData,
  useCreateResourceFormStore,
  CreateResourceFormStore,
  getInstillApiErrorMessage,
  type CreatePipelinePayload,
  type Nullable,
} from "../../../lib";
import { shallow } from "zustand/shallow";

const selector = (state: CreateResourceFormStore) => ({
  init: state.init,
  pipelineId: state.fields.pipeline.id,
  pipelineIdError: state.errors.pipeline.id,
  pipelineMode: state.fields.pipeline.mode,
  pipelineDescription: state.fields.pipeline.description,
  pipelineDescriptionError: state.errors.pipeline.description,
  sourceType: state.fields.source.type,
  existingSourceId: state.fields.source.existing.id,
  existingSourceDefinition: state.fields.source.existing.definition,
  newSourceId: state.fields.source.new.id,
  newSourceDefinition: state.fields.source.new.definition,
  destinationType: state.fields.destination.type,
  existingDestinationId: state.fields.destination.existing.id,
  existingDestinationDefinition: state.fields.destination.existing.definition,
  newDestinationId: state.fields.destination.new.id,
  newDestinationDefinition: state.fields.destination.new.definition,
  modelType: state.fields.model.type,
  existingModelId: state.fields.model.existing.id,
  existingModelDefinition: state.fields.model.existing.definition,
  newModelId: state.fields.model.new.id,
  newModelDefinition: state.fields.model.new.definition,
  newGithubModelRepoUrl: state.fields.model.new.github.repoUrl,
  newLocalModelFile: state.fields.model.new.local.file,
  newArtivcModelGcsBucketPath: state.fields.model.new.artivc.gcsBucketPath,
  newHuggingFaceModelRepoUrl: state.fields.model.new.huggingFace.repoUrl,
  setFieldValue: state.setFieldValue,
  setFieldError: state.setFieldError,
  setCreateNewResourceIsComplete: state.setCreateNewResourceIsComplete,
});

export type SetPipelineDetailsStepProps = {
  onCreate: Nullable<() => void>;
  accessToken: Nullable<string>;
};

export const SetPipelineDetailsStep = ({
  onCreate,
  accessToken,
}: SetPipelineDetailsStepProps) => {
  const { amplitudeIsInit } = useAmplitudeCtx();

  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const {
    init,
    pipelineId,
    pipelineIdError,
    pipelineMode,
    pipelineDescription,
    pipelineDescriptionError,
    sourceType,
    existingSourceId,
    existingSourceDefinition,
    newSourceId,
    newSourceDefinition,
    destinationType,
    existingDestinationId,
    existingDestinationDefinition,
    newDestinationId,
    newDestinationDefinition,
    modelType,
    existingModelId,
    existingModelDefinition,
    newModelId,
    newModelDefinition,
    newGithubModelRepoUrl,
    newLocalModelFile,
    newArtivcModelGcsBucketPath,
    newHuggingFaceModelRepoUrl,
    setFieldValue,
    setFieldError,
    setCreateNewResourceIsComplete,
  } = useCreateResourceFormStore(selector, shallow);

  /* -------------------------------------------------------------------------
   * Validate create pipeline form data
   * TOOD: Move this to zod superRefine
   * -----------------------------------------------------------------------*/

  const canSetupNewPipeline = useMemo(() => {
    console.log({
      pipelineMode,
      pipelineId,
      existingSourceId,
      existingSourceDefinition,
      existingDestinationId,
      existingDestinationDefinition,
      newSourceId,
      newSourceDefinition,
      newDestinationId,
      newDestinationDefinition,
      newModelId,
      newModelDefinition,
      newLocalModelFile,
      newGithubModelRepoUrl,
      newArtivcModelGcsBucketPath,
      newHuggingFaceModelRepoUrl,
      existingModelId,
      existingModelDefinition,
    });

    const validator = {
      pipelineIsValid: false,
      sourceIsValid: false,
      modelIsValid: false,
      destinationIsValid: false,
    };

    // Pipeline - Every pipeline's fields are required
    if (pipelineMode && pipelineId) {
      validator.pipelineIsValid = true;
    }

    // Source - id and definition are required
    if (existingSourceId && existingSourceDefinition) {
      validator.sourceIsValid = true;
    }

    if (newSourceId && newSourceDefinition) {
      validator.sourceIsValid = true;
    }

    // Destination - id and definition are required
    if (existingDestinationId && existingDestinationDefinition) {
      validator.destinationIsValid = true;
    }

    if (newDestinationId && newDestinationDefinition) {
      validator.destinationIsValid = true;
    }

    // Model - new - github
    if (
      newModelDefinition === "model-definitions/github" &&
      newModelId &&
      newGithubModelRepoUrl
    ) {
      validator.modelIsValid = true;
    }

    // Model - new - local
    if (
      newModelDefinition === "model-definitions/local" &&
      newModelId &&
      newLocalModelFile
    ) {
      validator.modelIsValid = true;
    }

    // Model - new - artivc
    if (
      newModelDefinition === "model-definitions/artivc" &&
      newModelId &&
      newArtivcModelGcsBucketPath
    ) {
      validator.modelIsValid = true;
    }

    // Model - new - huggingface
    if (
      newModelDefinition === "model-definitions/huggingface" &&
      newModelId &&
      newHuggingFaceModelRepoUrl
    ) {
      validator.modelIsValid = true;
    }

    if (existingModelId && existingModelDefinition) {
      validator.modelIsValid = true;
    }

    if (
      validator.pipelineIsValid &&
      validator.sourceIsValid &&
      validator.modelIsValid &&
      validator.destinationIsValid
    ) {
      return true;
    } else {
      return false;
    }
  }, [
    pipelineMode,
    pipelineId,
    existingSourceId,
    existingSourceDefinition,
    existingDestinationId,
    existingDestinationDefinition,
    newSourceId,
    newSourceDefinition,
    newDestinationId,
    newDestinationDefinition,
    newModelId,
    newModelDefinition,
    newLocalModelFile,
    newGithubModelRepoUrl,
    newArtivcModelGcsBucketPath,
    newHuggingFaceModelRepoUrl,
    existingModelId,
    existingModelDefinition,
  ]);

  /* -------------------------------------------------------------------------
   * Create pipeline
   * -----------------------------------------------------------------------*/

  const createPipeline = useCreatePipeline();
  const updatePipeline = useUpdatePipeline();

  const [messageBoxState, setMessageBoxState] =
    useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const handleSetupNewPipeline = () => {
    if (!canSetupNewPipeline || !pipelineId) {
      return;
    }

    // We don't validate the rest of the field if the ID is incorrect
    if (!validateResourceId(pipelineId as string)) {
      setFieldError(
        "pipeline.id",
        "Resource ID restricts to lowercase letters, numbers, and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum."
      );
      return;
    }

    let sourceName: string;

    if (sourceType === "new") {
      if (!newSourceId) return;
      sourceName = `source-connectors/${newSourceId}`;
    } else {
      if (!existingSourceId) return;
      sourceName = `source-connectors/${existingSourceId}`;
    }

    let modelName: string;

    if (modelType === "new") {
      if (!newModelId) {
        return;
      }
      modelName = `models/${newModelId}`;
    } else {
      if (!existingModelId) {
        return;
      }
      modelName = `models/${existingModelId}`;
    }

    let destinationName: string;

    if (destinationType === "new") {
      if (!newDestinationId) return;
      destinationName = `destination-connectors/${newDestinationId}`;
    } else {
      if (!existingDestinationId) return;
      destinationName = `destination-connectors/${existingDestinationId}`;
    }

    const payload: CreatePipelinePayload = {
      id: pipelineId,
      recipe: {
        source: sourceName,
        models: [modelName],
        destination: destinationName,
      },
    };

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Creating...",
    }));

    createPipeline.mutate(
      { payload, accessToken },
      {
        onSuccess: async (res) => {
          if (!pipelineDescription) {
            setMessageBoxState(() => ({
              activate: true,
              status: "success",
              description: null,
              message: "Succeed.",
            }));
            setCreateNewResourceIsComplete(true);
            if (onCreate) onCreate();
            init();
            return;
          }
          updatePipeline.mutate(
            {
              payload: {
                name: res.newPipeline.name,
                description: pipelineDescription,
              },
              accessToken,
            },
            {
              onSuccess: () => {
                if (amplitudeIsInit) {
                  sendAmplitudeData("create_pipeline", {
                    type: "critical_action",
                    process: "pipeline",
                  });
                }
                setCreateNewResourceIsComplete(true);
                if (onCreate) onCreate();
                init();
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
                    message: "Something went wrong when create the pipeline",
                  }));
                }
              },
            }
          );
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
              message: "Something went wrong when create the pipeline",
            }));
          }
        },
      }
    );
  };

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <div className="mb-5 flex flex-col gap-y-5">
      <BasicTextField
        id="pipeline-id"
        label="ID"
        description={
          "Pick a name to help you identify this resource. The ID conforms to RFC-1034, " +
          "which restricts to letters, numbers, and hyphen, with the first character a letter," +
          "the last a letter or a number, and a 63 character maximum."
        }
        value={pipelineId}
        error={pipelineIdError}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (!event.target.value) {
            setFieldValue("pipeline.id", null);
            setFieldError("pipeline.id", null);
            return;
          }

          const value = event.target.value.trim();
          setFieldValue("pipeline.id", value);

          if (validateResourceId(value)) {
            setFieldError("pipeline.id", null);
          } else {
            setFieldError(
              "pipeline.id",
              "Resource ID restricts to lowercase letters, numbers, and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum."
            );
          }
        }}
        required={true}
      />
      <BasicTextArea
        id="pipeline-description"
        label="Description"
        description="Fill with a short description."
        value={pipelineDescription}
        error={pipelineDescriptionError}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          setFieldValue("pipeline.description", event.target.value);
        }}
      />
      <div className="flex flex-row">
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
        <SolidButton
          position="ml-auto my-auto"
          type="button"
          color="primary"
          disabled={canSetupNewPipeline ? false : true}
          onClickHandler={handleSetupNewPipeline}
        >
          Set up
        </SolidButton>
      </div>
    </div>
  );
};
