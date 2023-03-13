import { FormRoot } from "@instill-ai/design-system";
import { Nullable, Pipeline, useMessageBoxStore } from "@instill-ai/toolkit";
import { useCallback } from "react";
import { ConfigurePipelineFormControl } from "./ConfigurePipelineFormControl";
import { ConfigurePipelineMessageBox } from "./ConfigurePipelineMessageBox";
import { PipelineDescriptionField } from "./PipelineDescriptionField";

export type ConfigurePipelineFormProps = {
  pipeline: Nullable<Pipeline>;
  marginBottom: Nullable<string>;
  width: Nullable<string>;
};

export const ConfigurePipelineForm = ({
  marginBottom,
  width,
  pipeline,
}: ConfigurePipelineFormProps) => {
  const setMessageBoxState = useMessageBoxStore((state) => state.setStateValue);

  const handleDeletePipeline = useCallback(() => {
    if (!pipeline) return;

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Deleting...",
    }));

    deletePipeline.mutate(pipeline.name, {
      onSuccess: () => {
        setMessageBoxState(() => ({
          activate: true,
          status: "success",
          description: null,
          message: "Succeed.",
        }));
        if (amplitudeIsInit) {
          sendAmplitudeData("delete_pipeline", {
            type: "critical_action",
            process: "destination",
          });
        }
        initResourceFormStore();
        router.push("/pipelines");
      },
      onError: (error) => {
        if (error instanceof Error) {
          setMessageBoxState(() => ({
            activate: true,
            status: "error",
            description: null,
            message: error.message,
          }));
        } else {
          setMessageBoxState(() => ({
            activate: true,
            status: "error",
            description: null,
            message: "Something went wrong when delete the pipeline",
          }));
        }
      },
    });
    closeModal();
  }, [
    pipeline,
    amplitudeIsInit,
    router,
    deletePipeline,
    initResourceFormStore,
    closeModal,
  ]);

  return (
    <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
      <div className="flex flex-col gap-y-10">
        <PipelineDescriptionField />
        <ConfigurePipelineFormControl pipeline={pipeline} />
        <ConfigurePipelineMessageBox />
      </div>
    </FormRoot>
  );
};
