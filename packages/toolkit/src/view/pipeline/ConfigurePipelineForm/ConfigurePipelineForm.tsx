import axios from "axios";
import * as React from "react";
import {
  BasicProgressMessageBox,
  FormRoot,
  ProgressMessageBoxState,
} from "@instill-ai/design-system";
import {
  getInstillApiErrorMessage,
  sendAmplitudeData,
  useAmplitudeCtx,
  useDeletePipeline,
  useModalStore,
  type Nullable,
  type Pipeline,
} from "../../../lib";

import { DeleteResourceModal } from "../../../components";
import { ConfigurePipelineFormControl } from "./ConfigurePipelineFormControl";
import { PipelineDescriptionField } from "./PipelineDescriptionField";

export type ConfigurePipelineFormProps = {
  pipeline: Nullable<Pipeline>;
  marginBottom: Nullable<string>;
  width: Nullable<string>;
  accessToken: Nullable<string>;
  onConfigure: Nullable<() => void>;
  disableConfigure: boolean;
  onDelete: Nullable<() => void>;
  disableDelete: boolean;
};

export const ConfigurePipelineForm = ({
  marginBottom,
  width,
  pipeline,
  accessToken,
  onConfigure,
  disableConfigure,
  onDelete,
  disableDelete,
}: ConfigurePipelineFormProps) => {
  const [messsageBoxState, setMessageBoxState] =
    React.useState<ProgressMessageBoxState>({
      activate: false,
      status: null,
      message: null,
      description: null,
    });
  const closeModal = useModalStore((state) => state.closeModal);
  const { amplitudeIsInit } = useAmplitudeCtx();
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
          if (onDelete) onDelete();
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
      <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
        <div className="flex flex-col gap-y-10">
          <PipelineDescriptionField pipeline={pipeline} />
          <ConfigurePipelineFormControl
            pipeline={pipeline}
            setMessageBoxState={setMessageBoxState}
            onConfigure={onConfigure}
            accessToken={accessToken}
            disableConfigure={disableConfigure}
            disableDelete={disableDelete}
          />
          <div className="flex">
            <BasicProgressMessageBox
              state={messsageBoxState}
              setActivate={(activate) =>
                setMessageBoxState((prev) => ({ ...prev, activate }))
              }
              width="w-[25vw]"
              closable={true}
            />
          </div>
        </div>
      </FormRoot>
      <DeleteResourceModal
        resource={pipeline}
        handleDeleteResource={handleDeletePipeline}
      />
    </>
  );
};
