import axios from "axios";
import { useCallback, useState } from "react";
import { shallow } from "zustand/shallow";
import {
  BasicProgressMessageBox,
  ProgressMessageBoxState,
  SolidButton,
} from "@instill-ai/design-system";

import {
  CreateSourceFormStore,
  CreateSourcePayload,
  Nullable,
  sendAmplitudeData,
  SourceWithDefinition,
  useAmplitudeCtx,
  useCreateSource,
  useCreateSourceFormStore,
} from "../../../lib";

const selector = (state: CreateSourceFormStore) => ({
  sourceDefinition: state.fields.sourceDefinition,
  setFieldError: state.setFieldError,
});

export type CreateSourceControlProps = {
  sources: Nullable<SourceWithDefinition[]>;
  onSuccessfulComplete: Nullable<() => void>;
};

export const CreateSourceControl = ({
  sources,
  onSuccessfulComplete,
}: CreateSourceControlProps) => {
  const { amplitudeIsInit } = useAmplitudeCtx();
  const { sourceDefinition, setFieldError } = useCreateSourceFormStore(
    selector,
    shallow
  );

  const [messageBoxState, setMessageBoxState] =
    useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const createSource = useCreateSource();

  const handleSubmit = useCallback(() => {
    if (!sourceDefinition) return;

    if (!sourceDefinition) {
      setFieldError("sourceDefinition", "Required");
      return;
    }

    if (sources?.find((e) => e.id === sourceDefinition)) {
      setFieldError(
        "sourceDefinition",
        "You could only create one http and one grpc source. Check the setup guide for more information."
      );
      return;
    }

    const payload: CreateSourcePayload = {
      id: sourceDefinition,
      source_connector_definition: `source-connector-definitions/${sourceDefinition}`,
      connector: {
        configuration: {},
      },
    };

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Creating...",
    }));

    createSource.mutate(
      { payload, accessToken: null },
      {
        onSuccess: () => {
          setMessageBoxState(() => ({
            activate: true,
            status: "success",
            description: null,
            message: "Succeed.",
          }));
          if (amplitudeIsInit) {
            sendAmplitudeData("create_source", {
              type: "critical_action",
              process: "source",
            });
          }
          if (onSuccessfulComplete) {
            onSuccessfulComplete();
          }
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: JSON.stringify(
                error.response?.data.details,
                null,
                "\t"
              ),
              message: error.message,
            }));
          } else {
            setMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: null,
              message: "Something went wrong when create the source",
            }));
          }
        },
      }
    );
  }, [
    amplitudeIsInit,
    createSource,
    sources,
    sourceDefinition,
    setFieldError,
    onSuccessfulComplete,
  ]);

  return (
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
        disabled={false}
        position="ml-auto my-auto"
        type="button"
        color="primary"
        onClickHandler={handleSubmit}
      >
        Set up
      </SolidButton>
    </div>
  );
};
