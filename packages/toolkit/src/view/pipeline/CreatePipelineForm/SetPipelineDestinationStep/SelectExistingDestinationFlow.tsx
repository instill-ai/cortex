import * as React from "react";
import Image from "next/image";
import { shallow } from "zustand/shallow";

import {
  BasicSingleSelect,
  SingleSelectOption,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useDestinations,
  useAmplitudeCtx,
  sendAmplitudeData,
  useCreateResourceFormStore,
  type CreateResourceFormStore,
  type Nullable,
} from "../../../../lib";

const selector = (state: CreateResourceFormStore) => ({
  pipelineMode: state.fields.pipeline.mode,
  existingDestinationId: state.fields.destination.existing.id,
  existingDestinationIdError: state.errors.destination.existing.id,
  setFieldValue: state.setFieldValue,
});

export type SelectExistingDestinationFlowProps = {
  accessToken: Nullable<string>;
  onSelect: () => void;
};

export const SelectExistingDestinationFlow = (
  props: SelectExistingDestinationFlowProps
) => {
  const { accessToken, onSelect } = props;
  const { amplitudeIsInit } = useAmplitudeCtx();

  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const {
    pipelineMode,
    existingDestinationId,
    existingDestinationIdError,
    setFieldValue,
  } = useCreateResourceFormStore(selector, shallow);

  /* -------------------------------------------------------------------------
   * Get existing destinations and set up options
   * -----------------------------------------------------------------------*/

  const [destinationOptions, setDestinationOptions] = React.useState<
    SingleSelectOption[] | null
  >(null);
  const destinations = useDestinations({ accessToken, enable: true });

  React.useEffect(() => {
    if (!destinations.isSuccess || !destinations.data) return;

    if (pipelineMode === "MODE_ASYNC") {
      setDestinationOptions(
        destinations.data
          .filter(
            (e) =>
              e.name !== "destination-connectors/destination-http" &&
              e.name !== "destination-connectors/destination-grpc"
          )
          .map((e) => {
            return {
              label: e.id,
              value: e.id,
              startIcon: (
                <Image
                  className="my-auto"
                  src={
                    e.destination_connector_definition.connector_definition.docker_repository.split(
                      "/"
                    )[0] === "airbyte"
                      ? `/icons/airbyte/${e.destination_connector_definition.connector_definition.icon}`
                      : `/icons/instill/${e.destination_connector_definition.connector_definition.icon}`
                  }
                  width={24}
                  height={24}
                  alt={`${e.id}-icon`}
                />
              ),
            };
          })
      );
    } else {
      setDestinationOptions(
        destinations.data.map((e) => {
          return {
            label: e.id,
            value: e.id,
          };
        })
      );
    }
  }, [destinations.isSuccess, destinations.data, pipelineMode]);

  const [selectedDestinationOption, setSelectedDestinationOption] =
    React.useState<Nullable<SingleSelectOption>>(null);

  /* -------------------------------------------------------------------------
   * Set up existing destinations
   * -----------------------------------------------------------------------*/

  const canUseExistingDestination = React.useMemo(() => {
    if (!existingDestinationId) {
      return false;
    }

    return true;
  }, [existingDestinationId]);

  const handleUseExistingDestination = () => {
    if (!existingDestinationId || !destinations.isSuccess) return;

    setFieldValue(
      "destination.existing.definition",
      `destination-connector-definitions/${existingDestinationId}`
    );
    setFieldValue("destination.type", "existing");
    onSelect();

    if (amplitudeIsInit) {
      sendAmplitudeData("use_existing_destination", {
        type: "critical_action",
        process: "pipeline",
      });
    }
  };

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <div className="flex flex-1 flex-col gap-y-5 p-5">
      <h3 className="text-black text-instill-h3">
        Select an existing destination
      </h3>
      <BasicSingleSelect
        id="existing-destination-id"
        label="Destination type"
        options={destinationOptions ? destinationOptions : []}
        value={selectedDestinationOption}
        error={existingDestinationIdError}
        required={true}
        disabled={false}
        onChange={(option) => {
          setFieldValue("destination.existing.id", option?.value);
          setSelectedDestinationOption(option);
        }}
      />
      <SolidButton
        position="ml-auto"
        type="button"
        color="primary"
        disabled={canUseExistingDestination ? false : true}
        onClickHandler={handleUseExistingDestination}
      >
        Select
      </SolidButton>
    </div>
  );
};
