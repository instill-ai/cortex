import axios from "axios";
import * as React from "react";
import { shallow } from "zustand/shallow";
import {
  BasicProgressMessageBox,
  ProgressMessageBoxState,
  SolidButton,
} from "@instill-ai/design-system";

import {
  sendAmplitudeData,
  useAmplitudeCtx,
  useCreateConnector,
  useCreateResourceFormStore,
  getInstillApiErrorMessage,
  type CreateResourceFormStore,
  type CreateConnectorPayload,
  type Nullable,
  type ConnectorWithDefinition,
} from "../../../lib";

const selector = (state: CreateResourceFormStore) => ({
  init: state.init,
  sourceDefinition: state.fields.source.new.definition,
  setFieldError: state.setFieldError,
});

export type CreateSourceControlProps = {
  sources: Nullable<ConnectorWithDefinition[]>;
  onCreate: Nullable<(initStore: () => void) => void>;
  accessToken: Nullable<string>;
};

export const CreateSourceControl = (props: CreateSourceControlProps) => {
  const { sources, onCreate, accessToken } = props;
  const { amplitudeIsInit } = useAmplitudeCtx();
  const { init, sourceDefinition, setFieldError } = useCreateResourceFormStore(
    selector,
    shallow
  );

  const [messageBoxState, setMessageBoxState] =
    React.useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const createConnector = useCreateConnector();

  const handleSubmit = React.useCallback(() => {
    if (!sourceDefinition) return;

    if (!sourceDefinition) {
      setFieldError("source.new.definition", "Required");
      return;
    }

    if (sources?.find((e) => e.id === sourceDefinition)) {
      setFieldError(
        "source.new.definition",
        "You could only create one trigger. Check the setup guide for more information."
      );
      return;
    }

    const payload: CreateConnectorPayload = {
      connectorName: `connectors/${sourceDefinition}`,
      connector_definition_name: `connector-definitions/${sourceDefinition}`,
      configuration: {},
    };

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Creating...",
    }));

    createConnector.mutate(
      { payload, accessToken },
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
          if (onCreate) onCreate(init);
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
              message: "Something went wrong when create the source",
            }));
          }
        },
      }
    );
  }, [
    init,
    amplitudeIsInit,
    createConnector,
    sources,
    sourceDefinition,
    setFieldError,
    onCreate,
    accessToken,
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
