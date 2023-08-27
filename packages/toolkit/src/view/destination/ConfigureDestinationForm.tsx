import * as React from "react";
import * as yup from "yup";
import axios, { isAxiosError } from "axios";
import { shallow } from "zustand/shallow";
import {
  FormRoot,
  BasicProgressMessageBox,
  BasicSingleSelect,
  BasicTextArea,
  DataDestinationIcon,
  OutlineButton,
  SolidButton,
  Button,
  Icons,
  type ProgressMessageBoxState,
  type FormRootProps,
} from "@instill-ai/design-system";
import {
  useAirbyteFieldValues,
  useAirbyteFormTree,
  useBuildAirbyteYup,
  dot,
  useAirbyteSelectedConditionMap,
  useDeleteConnectorResource,
  useUpdateConnectorResource,
  useAmplitudeCtx,
  sendAmplitudeData,
  useModalStore,
  useCreateResourceFormStore,
  getInstillApiErrorMessage,
  testConnectorResourceConnectionAction,
  useConnectConnectorResource,
  useDisonnectConnectorResource,
  type AirbyteFieldErrors,
  type AirbyteFieldValues,
  type UpdateConnectorResourcePayload,
  type Nullable,
  type CreateResourceFormStore,
  type ModalStore,
  type ConnectorResourceWithWatchState,
} from "../../lib";

import { AirbyteDestinationFields } from "../airbyte";
import { DeleteResourceModal, ImageWithFallback } from "../../components";

export type ConfigureDestinationFormProps = {
  accessToken: Nullable<string>;
  destination: ConnectorResourceWithWatchState;
  onConfigure: Nullable<(initStore: () => void) => void>;
  disabledConfigure?: boolean;
  onDelete: Nullable<(initStore: () => void) => void>;
  disabledDelete?: boolean;
} & Pick<FormRootProps, "marginBottom" | "width">;

const formSelector = (state: CreateResourceFormStore) => ({
  setFormIsDirty: state.setFormIsDirty,
  init: state.init,
});

const modalSelector = (state: ModalStore) => ({
  openModal: state.openModal,
  closeModal: state.closeModal,
});

export const ConfigureDestinationForm = (
  props: ConfigureDestinationFormProps
) => {
  const {
    destination,
    onDelete,
    onConfigure,
    accessToken,
    disabledConfigure,
    disabledDelete,
    width,
    marginBottom,
  } = props;
  const { amplitudeIsInit } = useAmplitudeCtx();

  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const { init, setFormIsDirty } = useCreateResourceFormStore(
    formSelector,
    shallow
  );

  const { openModal, closeModal } = useModalStore(modalSelector, shallow);

  // We will disable all the fields if the connector is public (which mean
  // it is provided by Instill AI)
  let disabledAll = false;
  if (
    "visibility" in destination &&
    destination.visibility === "VISIBILITY_PUBLIC"
  ) {
    disabledAll = true;
  }

  /* -------------------------------------------------------------------------
   * Get the destination definition and static state for fields
   * -----------------------------------------------------------------------*/

  const isResponseOperator = React.useMemo(() => {
    if (destination.connector_definition.id === "response") {
      return true;
    }

    return false;
  }, [destination]);

  const destinationDefinitionOption = React.useMemo(() => {
    return {
      label: destination.connector_definition.title,
      value: destination.connector_definition.id,
      startIcon: (
        <ImageWithFallback
          src={
            destination.connector_definition.vendor === "airbyte"
              ? `/icons/airbyte/${destination.connector_definition.icon}`
              : `/icons/instill/${destination.connector_definition.icon}`
          }
          width={24}
          height={24}
          alt={`${destination.connector_definition.title}-icon`}
          fallbackImg={<DataDestinationIcon width="w-6" height="h-6" />}
        />
      ),
    };
  }, [destination]);

  /* -------------------------------------------------------------------------
   * Create interior state for managing the form
   * -----------------------------------------------------------------------*/

  const [airbyteFormIsDirty, setAirbyteFormIsDirty] = React.useState(false);

  // If the airbyte form is dirty we need to inform the parent.
  React.useEffect(() => {
    if (airbyteFormIsDirty) {
      setFormIsDirty(true);
    }
  }, [airbyteFormIsDirty, setFormIsDirty]);

  const [fieldErrors, setFieldErrors] =
    React.useState<Nullable<AirbyteFieldErrors>>(null);

  const destinationFormTree = useAirbyteFormTree(
    destination.connector_definition
  );

  const initialValues: AirbyteFieldValues = {
    configuration: destination.configuration,
    ...dot.toDot(destination.configuration),
    description: destination.description || undefined,
  };

  const [selectedConditionMap, setSelectedConditionMap] =
    useAirbyteSelectedConditionMap(destinationFormTree, initialValues);

  const { fieldValues, setFieldValues } = useAirbyteFieldValues(
    destinationFormTree,
    initialValues
  );

  const [canEdit, setCanEdit] = React.useState(false);
  const [messageBoxState, setMessageBoxState] =
    React.useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  const airbyteYup = useBuildAirbyteYup(
    destination.connector_definition.spec.resource_specification ?? null,
    selectedConditionMap,
    null
  );

  const formYup = React.useMemo(() => {
    if (!airbyteYup) return null;

    return yup.object({
      configuration: airbyteYup,
    });
  }, [airbyteYup]);

  const updateFieldValues = React.useCallback(
    (field: string, value: string) => {
      setAirbyteFormIsDirty(true);
      setFieldValues((prev) => {
        return {
          ...prev,
          [field]: value,
        };
      });
    },
    [setFieldValues, setAirbyteFormIsDirty]
  );

  /* -------------------------------------------------------------------------
   * Configure destination
   * -----------------------------------------------------------------------*/

  const updateDestination = useUpdateConnectorResource();

  const handleSubmit = React.useCallback(async () => {
    if (destination.id === "response") {
      return;
    }

    if (!fieldValues || !formYup) {
      return;
    }

    let stripValues = {} as { configuration: AirbyteFieldValues };

    if (!canEdit) {
      setCanEdit(true);
      return;
    } else {
      if (!airbyteFormIsDirty) {
        setCanEdit(false);
      }
      try {
        // We use yup to strip not necessary condition value. Please read
        // /lib/airbyte/README.md for more information, especially the section
        // How to remove old condition configuration when user select new one?

        stripValues = formYup.validateSync(fieldValues, {
          abortEarly: false,
          strict: false,
          stripUnknown: true,
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = {} as AirbyteFieldErrors;
          for (const err of error.inner) {
            if (err.path) {
              const message = err.message.replace(err.path, "This field");
              const pathList = err.path.split(".");

              // Because we are using { configuration: airbyteYup } to construct the yup, yup will add "configuration" as prefix at the start
              // of the path like configuration.tunnel_method
              if (pathList[0] === "configuration") {
                pathList.shift();
              }

              const removeConfigurationPrefixPath = pathList.join(".");
              errors[removeConfigurationPrefixPath] = message;
            }
          }
          setFieldErrors(errors);
        }

        return;
      }
      setFieldErrors(null);

      const payload: UpdateConnectorResourcePayload = {
        connectorResourceName: destination.name,
        description: fieldValues.description as string | undefined,
        ...stripValues,
      };

      setMessageBoxState(() => ({
        activate: true,
        status: "progressing",
        description: null,
        message: "Updating...",
      }));

      updateDestination.mutate(
        { payload, accessToken },
        {
          onSuccess: () => {
            setCanEdit(false);
            setAirbyteFormIsDirty(false);
            setFormIsDirty(false);

            if (onConfigure) onConfigure(init);

            setMessageBoxState(() => ({
              activate: true,
              status: "success",
              description: null,
              message: "Succeed.",
            }));

            if (amplitudeIsInit) {
              sendAmplitudeData("update_destination", {
                type: "critical_action",
                process: "destination",
              });
            }
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
                message: "Something went wrong when create the destination",
              }));
            }
          },
        }
      );

      return;
    }
  }, [
    destination.id,
    amplitudeIsInit,
    formYup,
    fieldValues,
    canEdit,
    setCanEdit,
    airbyteFormIsDirty,
    setAirbyteFormIsDirty,
    destination.name,
    updateDestination,
    init,
    onConfigure,
    accessToken,
    setFormIsDirty,
  ]);

  // ##########################################################################
  // # Handle delete destination                                              #
  // ##########################################################################

  const deleteDestination = useDeleteConnectorResource();
  const handleDeleteDestination = React.useCallback(() => {
    if (!destination) return;

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Deleting...",
    }));

    closeModal();

    deleteDestination.mutate(
      { connectorResourceName: destination.name, accessToken },
      {
        onSuccess: () => {
          setMessageBoxState(() => ({
            activate: true,
            status: "success",
            description: null,
            message: "Succeed.",
          }));

          if (onDelete) onDelete(init);

          if (amplitudeIsInit) {
            sendAmplitudeData("delete_destination", {
              type: "critical_action",
              process: "destination",
            });
          }
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setMessageBoxState(() => ({
              activate: true,
              message: `${error.response?.status} - ${error.response?.data.message}`,
              description: getInstillApiErrorMessage(error),
              status: "error",
            }));
          } else {
            setMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: null,
              message: "Something went wrong when delete the source",
            }));
          }
        },
      }
    );
  }, [
    init,
    amplitudeIsInit,
    deleteDestination,
    destination,
    closeModal,
    onDelete,
    accessToken,
  ]);

  const handleTestDestination = async function () {
    if (!destination) return;

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Testing...",
    }));

    try {
      const state = await testConnectorResourceConnectionAction({
        connectorResourceName: destination.name,
        accessToken,
      });

      setMessageBoxState(() => ({
        activate: true,
        status: state === "STATE_ERROR" ? "error" : "success",
        description: null,
        message: `The destination's state is ${state}`,
      }));
    } catch (err) {
      setMessageBoxState(() => ({
        activate: true,
        status: "error",
        description: null,
        message: "Something went wrong when test the destination",
      }));
    }
  };

  const [isConnecting, setIsConnecting] = React.useState(false);

  const connectDestination = useConnectConnectorResource();
  const disconnectDestination = useDisonnectConnectorResource();

  const handleConnectAI = async function () {
    if (!destination) return;
    setIsConnecting(true);
    if (destination.watchState === "STATE_CONNECTED") {
      disconnectDestination.mutate(
        {
          connectorResourceName: destination.name,
          accessToken,
        },
        {
          onSuccess: () => {
            setMessageBoxState(() => ({
              activate: true,
              status: "success",
              description: null,
              message: `Successfully disconnect ${destination.id}`,
            }));

            setIsConnecting(false);
          },
          onError: (error) => {
            setIsConnecting(false);

            if (isAxiosError(error)) {
              setMessageBoxState(() => ({
                activate: true,
                message: error.message,
                description: getInstillApiErrorMessage(error),
                status: "error",
              }));
            } else {
              setMessageBoxState(() => ({
                activate: true,
                status: "error",
                description: null,
                message: "Something went wrong when disconnect the destination",
              }));
            }
          },
        }
      );
    } else {
      connectDestination.mutate(
        {
          connectorResourceName: destination.name,
          accessToken,
        },
        {
          onSuccess: () => {
            setMessageBoxState(() => ({
              activate: true,
              status: "success",
              description: null,
              message: `Successfully connect ${destination.id}`,
            }));
            setIsConnecting(false);
          },
          onError: (error) => {
            setIsConnecting(false);

            if (isAxiosError(error)) {
              setMessageBoxState(() => ({
                activate: true,
                message: error.message,
                description: getInstillApiErrorMessage(error),
                status: "error",
              }));
            } else {
              setMessageBoxState(() => ({
                activate: true,
                status: "error",
                description: null,
                message: "Something went wrong when connect the destination",
              }));
            }
          },
        }
      );
    }
  };

  return (
    <>
      <FormRoot marginBottom={marginBottom} width={width}>
        <div className="mb-8 flex flex-col gap-y-5">
          <BasicSingleSelect
            id="destination-definition"
            key="definition"
            label="Data type"
            disabled={true}
            value={destinationDefinitionOption}
            options={[destinationDefinitionOption]}
            description={`<a href='${destination.connector_definition.documentation_url}'>Setup Guide</a>`}
          />
          {!isResponseOperator ? (
            <BasicTextArea
              id="destination-description"
              label="Description"
              key="description"
              description="Fill with a short description."
              required={false}
              error={
                fieldErrors ? (fieldErrors.description as string) ?? null : null
              }
              value={
                fieldValues ? (fieldValues.description as string) ?? null : null
              }
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateFieldValues("description", event.target.value)
              }
              disabled={disabledAll ? disabledAll : !canEdit}
            />
          ) : null}
          <AirbyteDestinationFields
            destinationFormTree={destinationFormTree}
            fieldValues={fieldValues}
            setFieldValues={setFieldValues}
            fieldErrors={fieldErrors}
            selectedConditionMap={selectedConditionMap}
            setSelectedConditionMap={setSelectedConditionMap}
            disableAll={disabledAll ? disabledAll : !canEdit}
            formIsDirty={airbyteFormIsDirty}
            setFormIsDirty={setAirbyteFormIsDirty}
          />
        </div>
        <div className="mb-10 flex flex-row">
          <div className="flex flex-row items-center space-x-5 mr-auto">
            <SolidButton
              type="button"
              disabled={false}
              color="primary"
              onClickHandler={handleTestDestination}
            >
              Test
            </SolidButton>
            <Button
              onClick={handleConnectAI}
              className="gap-x-2 !rounded-none"
              variant="primary"
              size="lg"
              type="button"
              disabled={
                disabledAll
                  ? disabledAll
                  : destination.name === "connectors/response"
                  ? true
                  : false
              }
            >
              {destination.watchState === "STATE_CONNECTED"
                ? "Disconnect"
                : "Connect"}
              {isConnecting ? (
                <svg
                  className="m-auto h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : destination.watchState === "STATE_CONNECTED" ||
                destination.watchState === "STATE_ERROR" ? (
                <Icons.Stop className="h-4 w-4 fill-semantic-fg-on-default stroke-semantic-fg-on-default group-disabled:fill-semantic-fg-disabled group-disabled:stroke-semantic-fg-disabled" />
              ) : (
                <Icons.Play className="h-4 w-4 fill-semantic-fg-on-default stroke-semantic-fg-on-default group-disabled:fill-semantic-fg-disabled group-disabled:stroke-semantic-fg-disabled" />
              )}
            </Button>
            <SolidButton
              type="button"
              color="primary"
              disabled={
                disabledAll
                  ? disabledAll
                  : disabledConfigure
                  ? true
                  : isResponseOperator
                  ? true
                  : false
              }
              onClickHandler={() => handleSubmit()}
            >
              {canEdit ? "Save" : "Edit"}
            </SolidButton>
          </div>

          <OutlineButton
            disabled={disabledDelete ? true : false}
            onClickHandler={() => openModal()}
            position="my-auto"
            type="button"
            color="danger"
            hoveredShadow={null}
          >
            Delete
          </OutlineButton>
        </div>
        <div className="flex">
          <BasicProgressMessageBox
            state={messageBoxState}
            setActivate={(activate) =>
              setMessageBoxState((prev) => ({ ...prev, activate }))
            }
            width="w-[25vw]"
            closable={true}
          />
        </div>
      </FormRoot>
      <DeleteResourceModal
        resource={destination}
        handleDeleteResource={handleDeleteDestination}
      />
    </>
  );
};
