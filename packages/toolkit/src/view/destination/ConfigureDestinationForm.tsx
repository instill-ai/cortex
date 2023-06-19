import * as React from "react";
import * as yup from "yup";
import axios from "axios";
import { shallow } from "zustand/shallow";
import {
  FormRoot,
  BasicProgressMessageBox,
  BasicSingleSelect,
  BasicTextArea,
  DataDestinationIcon,
  OutlineButton,
  SolidButton,
  type ProgressMessageBoxState,
  type FormRootProps,
} from "@instill-ai/design-system";
import {
  useAirbyteFieldValues,
  useAirbyteFormTree,
  useBuildAirbyteYup,
  dot,
  useAirbyteSelectedConditionMap,
  useDeleteDestination,
  useUpdateDestination,
  useAmplitudeCtx,
  sendAmplitudeData,
  useModalStore,
  useCreateResourceFormStore,
  getInstillApiErrorMessage,
  testDestinationConnectionAction,
  type AirbyteFieldErrors,
  type AirbyteFieldValues,
  type DestinationWithDefinition,
  type UpdateDestinationPayload,
  type Nullable,
  type CreateResourceFormStore,
  type ModalStore,
} from "../../lib";

import { AirbyteDestinationFields } from "../airbyte";
import { DeleteResourceModal, ImageWithFallback } from "../../components";

export type ConfigureDestinationFormProps = {
  accessToken: Nullable<string>;
  destination: DestinationWithDefinition;
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

  /* -------------------------------------------------------------------------
   * Get the destination definition and static state for fields
   * -----------------------------------------------------------------------*/

  const isSyncDestination = React.useMemo(() => {
    if (
      destination.destination_connector_definition.id === "destination-grpc" ||
      destination.destination_connector_definition.id === "destination-http"
    ) {
      return true;
    }

    return false;
  }, [destination]);

  const destinationDefinitionOption = React.useMemo(() => {
    return {
      label:
        destination.destination_connector_definition.connector_definition.title,
      value: destination.destination_connector_definition.id,
      startIcon: (
        <ImageWithFallback
          src={
            destination.destination_connector_definition.id.startsWith("airbyte")
              ? `/icons/airbyte/${destination.destination_connector_definition.connector_definition.icon}`
              : `/icons/instill/${destination.destination_connector_definition.connector_definition.icon}`
          }
          width={24}
          height={24}
          alt={`${destination.destination_connector_definition.connector_definition.title}-icon`}
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
    destination.destination_connector_definition
  );

  const initialValues: AirbyteFieldValues = {
    configuration: destination.connector.configuration,
    ...dot.toDot(destination.connector.configuration),
    description: destination.connector.description || undefined,
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
    destination.destination_connector_definition.connector_definition.spec
      .connection_specification ?? null,
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

  const updateDestination = useUpdateDestination();

  const handleSubmit = React.useCallback(async () => {
    if (
      destination.id === "destination-grpc" ||
      destination.id === "destination-http"
    ) {
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

      const payload: UpdateDestinationPayload = {
        name: destination.name,
        connector: {
          description: fieldValues.description as string | undefined,
          ...stripValues,
        },
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

  const deleteDestination = useDeleteDestination();
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
      { destinationName: destination.name, accessToken },
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
      const res = await testDestinationConnectionAction({
        destinationName: destination.name,
        accessToken,
      });

      setMessageBoxState(() => ({
        activate: true,
        status: res.state === "STATE_ERROR" ? "error" : "success",
        description: null,
        message: `The destination's state is ${res.state}`,
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

  return (
    <>
      <FormRoot marginBottom={marginBottom} width={width}>
        <div className="mb-8 flex flex-col gap-y-5">
          <BasicSingleSelect
            id="destination-definition"
            key="definition"
            label="Destination type"
            disabled={true}
            value={destinationDefinitionOption}
            options={[destinationDefinitionOption]}
            description={`<a href='${destination.destination_connector_definition.connector_definition.documentation_url}'>Setup Guide</a>`}
          />
          {!isSyncDestination ? (
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
              disabled={!canEdit}
            />
          ) : null}
          <AirbyteDestinationFields
            destinationFormTree={destinationFormTree}
            fieldValues={fieldValues}
            setFieldValues={setFieldValues}
            fieldErrors={fieldErrors}
            selectedConditionMap={selectedConditionMap}
            setSelectedConditionMap={setSelectedConditionMap}
            disableAll={!canEdit}
            formIsDirty={airbyteFormIsDirty}
            setFormIsDirty={setAirbyteFormIsDirty}
          />
        </div>
        <div className="mb-10 flex flex-row">
          <div className="flex flex-row items-center space-x-5 mr-auto">
            <SolidButton
              type="submit"
              disabled={false}
              color="primary"
              onClickHandler={handleTestDestination}
            >
              Test
            </SolidButton>
            <SolidButton
              type="button"
              color="primary"
              disabled={
                disabledConfigure ? true : isSyncDestination ? true : false
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
