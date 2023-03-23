import axios from "axios";
import { useCallback, useState } from "react";
import { shallow } from "zustand/shallow";
import {
  BasicProgressMessageBox,
  ProgressMessageBoxState,
  SolidButton,
} from "@instill-ai/design-system";

import {
  sendAmplitudeData,
  useAmplitudeCtx,
  useCreateSource,
  useCreateResourceFormStore,
  type CreateResourceFormStore,
  type CreateSourcePayload,
  type Nullable,
  type SourceWithDefinition,
} from "../../../lib";

const selector = (state: CreateResourceFormStore) => ({
  sourceDefinition: state.fields.source.new.definition,
  setFieldError: state.setFieldError,
});

export type CreateSourceControlProps = {
  sources: Nullable<SourceWithDefinition[]>;
  onCreate: Nullable<() => void>;
};

export const CreateSourceControl = ({
  sources,
  onCreate,
}: CreateSourceControlProps) => {
  const { amplitudeIsInit } = useAmplitudeCtx();
  const { sourceDefinition, setFieldError } = useCreateResourceFormStore(
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
      setFieldError("source.new.definition", "Required");
      return;
    }

    if (sources?.find((e) => e.id === sourceDefinition)) {
      setFieldError(
        "source.new.definition",
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
          if (onCreate) onCreate();
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
    onCreate,
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
