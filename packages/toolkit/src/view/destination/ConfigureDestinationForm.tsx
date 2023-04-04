import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
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
  useCreateUpdateDeleteResourceGuard,
  useModalStore,
  useCreateResourceFormStore,
  type AirbyteFieldErrors,
  type AirbyteFieldValues,
  type DestinationWithDefinition,
  type UpdateDestinationPayload,
  type Nullable,
  type CreateResourceFormStore,
  ModalStore,
  getInstillApiErrorMessage,
} from "../../lib";

import { AirbyteDestinationFields } from "../airbyte";
import { DeleteResourceModal, ImageWithFallback } from "../../components";

export type ConfigureDestinationFormProps = {
  destination: DestinationWithDefinition;
  width: Nullable<string>;
  onConfigure: Nullable<() => void>;
  initStoreOnConfigure: boolean;
  onDelete: Nullable<() => void>;
  accessToken: Nullable<string>;
};

const formSelector = (state: CreateResourceFormStore) => ({
  setFormIsDirty: state.setFormIsDirty,
  init: state.init,
});

const modalSelector = (state: ModalStore) => ({
  openModal: state.openModal,
  closeModal: state.closeModal,
});

export const ConfigureDestinationForm = ({
  destination,
  onDelete,
  onConfigure,
  initStoreOnConfigure,
  width,
  accessToken,
}: ConfigureDestinationFormProps) => {
  const { amplitudeIsInit } = useAmplitudeCtx();
  const router = useRouter();

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

  const isSyncDestination = useMemo(() => {
    if (
      destination.destination_connector_definition.connector_definition
        .docker_repository === "instill-ai/destination-grpc" ||
      destination.destination_connector_definition.connector_definition
        .docker_repository === "instill-ai/destination-http"
    ) {
      return true;
    }

    return false;
  }, [destination]);

  const destinationDefinitionOption = useMemo(() => {
    return {
      label:
        destination.destination_connector_definition.connector_definition.title,
      value: destination.destination_connector_definition.id,
      startIcon: (
        <ImageWithFallback
          src={
            destination.destination_connector_definition.connector_definition.docker_repository.split(
              "/"
            )[0] === "airbyte"
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

  const [airbyteFormIsDirty, setAirbyteFormIsDirty] = useState(false);

  // If the airbyte form is dirty we need to inform the parent.
  useEffect(() => {
    if (airbyteFormIsDirty) {
      setFormIsDirty(true);
    }
  }, [airbyteFormIsDirty, setFormIsDirty]);

  const [fieldErrors, setFieldErrors] =
    useState<Nullable<AirbyteFieldErrors>>(null);

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

  const [canEdit, setCanEdit] = useState(false);
  const [messageBoxState, setMessageBoxState] =
    useState<ProgressMessageBoxState>({
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

  const formYup = useMemo(() => {
    if (!airbyteYup) return null;

    return yup.object({
      configuration: airbyteYup,
    });
  }, [airbyteYup]);

  const updateFieldValues = useCallback(
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

  const handleSubmit = useCallback(async () => {
    if (
      destination.destination_connector_definition.connector_definition
        .docker_repository === "instill-ai/destination-grpc" ||
      destination.destination_connector_definition.connector_definition
        .docker_repository === "instill-ai/destination-http"
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
      if (!airbyteFormIsDirty) return;
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

            if (initStoreOnConfigure) {
              init();
            }

            if (onConfigure) onConfigure();

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
    destination.destination_connector_definition.connector_definition
      .docker_repository,
    destination.name,
    updateDestination,
    init,
    initStoreOnConfigure,
    onConfigure,
    accessToken,
  ]);

  // ##########################################################################
  // # Handle delete destination                                              #
  // ##########################################################################

  const enableGuard = useCreateUpdateDeleteResourceGuard();
  const deleteDestination = useDeleteDestination();
  const handleDeleteDestination = useCallback(() => {
    if (!destination) return;

    setMessageBoxState(() => ({
      activate: true,
      status: "progressing",
      description: null,
      message: "Deleting...",
    }));

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

          if (onDelete) onDelete();

          if (amplitudeIsInit) {
            sendAmplitudeData("delete_destination", {
              type: "critical_action",
              process: "destination",
            });
          }
          router.push("/destinations");
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
    closeModal();
  }, [
    amplitudeIsInit,
    deleteDestination,
    destination,
    router,
    closeModal,
    onDelete,
    accessToken,
  ]);

  return (
    <>
      <FormRoot marginBottom={null} formLess={false} width={width}>
        <div className="mb-8 flex flex-col gap-y-5">
          <BasicSingleSelect
            id="definition"
            key="definition"
            label="Destination type"
            disabled={true}
            value={destinationDefinitionOption}
            options={[]}
            description={`<a href='${destination.destination_connector_definition.connector_definition.documentation_url}'>Setup Guide</a>`}
          />
          {!isSyncDestination ? (
            <BasicTextArea
              id="description"
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
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
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
          <OutlineButton
            disabled={enableGuard}
            onClickHandler={() => openModal()}
            position="mr-auto my-auto"
            type="button"
            color="danger"
            hoveredShadow={null}
          >
            Delete
          </OutlineButton>
          <SolidButton
            type="button"
            color="primary"
            disabled={isSyncDestination}
            position="ml-auto my-auto"
            onClickHandler={() => handleSubmit()}
          >
            {canEdit ? "Save" : "Edit"}
          </SolidButton>
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
