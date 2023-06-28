import * as React from "react";
import Image from "next/image";
import { shallow } from "zustand/shallow";

import {
  BasicSingleSelect,
  SingleSelectOption,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useAmplitudeCtx,
  sendAmplitudeData,
  useConnectors,
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
  onSelect: () => void;
  accessToken: Nullable<string>;
  enabledQuery: boolean;
};

export const SelectExistingDestinationFlow = (
  props: SelectExistingDestinationFlowProps
) => {
  const { onSelect, accessToken, enabledQuery } = props;
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

  const destinations = useConnectors({
    connectorType: "CONNECTOR_TYPE_DESTINATION",
    accessToken: accessToken,
    enabled: enabledQuery,
  });

  const [destinationOptions, setDestinationOptions] = React.useState<
    SingleSelectOption[] | null
  >(null);

  React.useEffect(() => {
    if (!destinations.isSuccess) return;

    if (pipelineMode === "MODE_ASYNC") {
      setDestinationOptions(
        destinations.data
          .filter(
            (e) =>
              e.name !== "connectors/destination-http" &&
              e.name !== "connectors/destination-grpc"
          )
          .map((e) => {
            return {
              label: e.id,
              value: e.id,
              startIcon: (
                <Image
                  className="my-auto"
                  src={
                    e.connector_definition.vendor === "airbyte"
                      ? `/icons/airbyte/${e.connector_definition.icon}`
                      : `/icons/instill/${e.connector_definition.icon}`
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
    if (!existingDestinationId || !destinations) return;

    setFieldValue(
      "destination.existing.definition",
      `connector-definitions/${existingDestinationId}`
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
