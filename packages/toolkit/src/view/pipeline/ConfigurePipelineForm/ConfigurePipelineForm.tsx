import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import {
  BasicProgressMessageBox,
  FormRoot,
  ProgressMessageBoxState,
} from "@instill-ai/design-system";
import {
  sendAmplitudeData,
  useAmplitudeCtx,
  useDeletePipeline,
  useModalStore,
  type Nullable,
  type Pipeline,
} from "../../../lib";

import { DeleteResourceModal } from "../../DeleteResourceModal";
import { ConfigurePipelineFormControl } from "./ConfigurePipelineFormControl";
import { PipelineDescriptionField } from "./PipelineDescriptionField";

export type ConfigurePipelineFormProps = {
  pipeline: Nullable<Pipeline>;
  marginBottom: Nullable<string>;
  width: Nullable<string>;
  accessToken: Nullable<string>;
};

export const ConfigurePipelineForm = ({
  marginBottom,
  width,
  pipeline,
  accessToken,
}: ConfigurePipelineFormProps) => {
  const [messsageBoxState, setMessageBoxState] =
    useState<ProgressMessageBoxState>({
      activate: false,
      status: null,
      message: null,
      description: null,
    });
  const closeModal = useModalStore((state) => state.closeModal);
  const { amplitudeIsInit } = useAmplitudeCtx();
  const deletePipeline = useDeletePipeline();
  const router = useRouter();

  const handleDeletePipeline = useCallback(() => {
    if (!pipeline) return;

    setMessageBoxState({
      activate: true,
      status: "progressing",
      description: null,
      message: "Deleting...",
    });

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
          router.push("/pipelines");
        },
        onError: (error) => {
          if (error instanceof Error) {
            setMessageBoxState({
              activate: true,
              status: "error",
              description: null,
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
    closeModal();
  }, [
    pipeline,
    amplitudeIsInit,
    router,
    deletePipeline,
    closeModal,
    accessToken,
    setMessageBoxState,
  ]);

  return (
    <>
      <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
        <div className="flex flex-col gap-y-10">
          <PipelineDescriptionField />
          <ConfigurePipelineFormControl
            pipeline={pipeline}
            setMessageBoxState={setMessageBoxState}
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
