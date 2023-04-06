import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import {
  BasicSingleSelect,
  GrpcIcon,
  HttpIcon,
  SingleSelectOption,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useCreateDestination,
  useDestinations,
  useAmplitudeCtx,
  sendAmplitudeData,
  useCreateResourceFormStore,
  type CreateDestinationPayload,
  type CreateResourceFormStore,
  type Nullable,
} from "../../../../lib";

import { FormVerticalDivider } from "../FormVerticalDivider";
import { SelectExistingDestinationFlow } from "./SelectExistingDestinationFlow";
import { CreateDestinationForm } from "../../../destination";

const selector = (state: CreateResourceFormStore) => ({
  pipelineMode: state.fields.pipeline.mode,
  newSourceId: state.fields.source.new.id,
  existingSourceId: state.fields.source.existing.id,
  existingDestinationId: state.fields.destination.existing.id,
  existingDestinationIdError: state.errors.destination.existing.id,
  increasePipelineFormStep: state.increasePipelineFormStep,
  setFieldValue: state.setFieldValue,
  sourceType: state.fields.source.type,
});

export type SetPipelineDestinationStepProps = {
  accessToken: Nullable<string>;
};

export const SetPipelineDestinationStep = ({
  accessToken,
}: SetPipelineDestinationStepProps) => {
  const { amplitudeIsInit } = useAmplitudeCtx();

  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const {
    pipelineMode,
    sourceType,
    newSourceId,
    existingSourceId,
    increasePipelineFormStep,
    setFieldValue,
  } = useCreateResourceFormStore(selector, shallow);

  /* -------------------------------------------------------------------------
   * Initialize destination definition and options
   * -----------------------------------------------------------------------*/

  const [syncDestinationOptions, setSyncDestinationOptions] = useState<
    SingleSelectOption[]
  >([]);

  const [selectedSyncDestinationOption, setSelectedSyncDestinationOption] =
    useState<SingleSelectOption | null>(null);

  useEffect(() => {
    const syncDestinationOptions = [
      {
        label: "gRPC",
        value: "destination-grpc",
        startIcon: (
          <GrpcIcon
            color="fill-instillGrey90"
            height="h-[30px]"
            width="w-[30px]"
            position="my-auto"
          />
        ),
      },
      {
        label: "HTTP",
        value: "destination-http",
        startIcon: (
          <HttpIcon
            color="fill-instillGrey90"
            height="h-[30px]"
            width="w-[30px]"
            position="my-auto"
          />
        ),
      },
    ];

    setSyncDestinationOptions(syncDestinationOptions);

    if (sourceType === "existing") {
      setSelectedSyncDestinationOption(
        syncDestinationOptions.find(
          (e) => e.value === existingSourceId?.replace("source", "destination")
        ) || null
      );
    } else {
      setSelectedSyncDestinationOption(
        syncDestinationOptions.find(
          (e) => e.value === newSourceId?.replace("source", "destination")
        ) || null
      );
    }
  }, [existingSourceId, newSourceId, sourceType]);

  /* -------------------------------------------------------------------------
   * Create target destination.
   * We have to make sure there has no duplicated destination
   * -----------------------------------------------------------------------*/

  const createDestination = useCreateDestination();
  const destinations = useDestinations({ accessToken, enable: true });

  const handleGoNext = () => {
    if (!destinations.isSuccess || !selectedSyncDestinationOption) {
      return;
    }

    if (pipelineMode === "MODE_SYNC") {
      const destinationIndex = destinations.data.findIndex(
        (e) => e.id === selectedSyncDestinationOption.value
      );

      setFieldValue(
        "destination.existing.definition",
        `destination-connector-definitions/${selectedSyncDestinationOption.value}`
      );

      if (destinationIndex !== -1) {
        if (amplitudeIsInit) {
          sendAmplitudeData("use_existing_destination", {
            type: "critical_action",
            process: "pipeline",
          });
        }
        setFieldValue("destination.type", "existing");
        setFieldValue(
          "destination.existing.id",
          selectedSyncDestinationOption.value
        );
        setFieldValue(
          "destination.existing.definition",
          `destination-connector-definitions/${selectedSyncDestinationOption.value}`
        );
        increasePipelineFormStep();
        return;
      }

      const payload: CreateDestinationPayload = {
        id: selectedSyncDestinationOption.value,
        destination_connector_definition: `destination-connector-definitions/${selectedSyncDestinationOption.value}`,
        connector: {
          configuration: {},
        },
      };

      createDestination.mutate(
        { payload, accessToken },
        {
          onSuccess: () => {
            if (amplitudeIsInit) {
              sendAmplitudeData("create_destination", {
                type: "critical_action",
                process: "pipeline",
              });
            }
            setFieldValue("destination.type", "new");
            setFieldValue(
              "destination.new.id",
              selectedSyncDestinationOption.value
            );
            setFieldValue(
              "destination.new.definition",
              `destination-connector-definitions/${selectedSyncDestinationOption.value}`
            );
            increasePipelineFormStep();
          },
        }
      );
    }
  };

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <>
      {pipelineMode === "MODE_SYNC" ? (
        <div className="flex flex-col gap-y-5">
          <BasicSingleSelect
            id="existing-destination-id"
            label="Destination type"
            description={
              "With the selection of Sync mode for the Pipeline, the destination will be the same as the source. <a href='https://www.instill.tech/docs/core-concepts/pipeline#sync-mode'>Learn more →</a>"
            }
            options={syncDestinationOptions}
            value={selectedSyncDestinationOption}
            error={null}
            disabled={true}
            required={true}
          />
          <SolidButton
            position="ml-auto"
            disabled={false}
            type="button"
            color="primary"
            onClickHandler={handleGoNext}
          >
            Next
          </SolidButton>
        </div>
      ) : (
        <div className="flex flex-1 flex-row items-stretch">
          <div className="flex w-1/3">
            <SelectExistingDestinationFlow
              onSelect={() => {
                increasePipelineFormStep();
              }}
              accessToken={accessToken}
            />
          </div>
          <div className="flex">
            <FormVerticalDivider />
          </div>
          <div className="flex w-2/3">
            <CreateDestinationForm
              onCreate={(id: string) => {
                setFieldValue("destination.new.id", id);
                setFieldValue(
                  "destination.new.definition",
                  `destination-connector-definitions/${id}`
                );
                setFieldValue("destination.type", "new");
                increasePipelineFormStep();
              }}
              title="Setup a new destination"
              formLess={true}
              marginBottom={null}
              initStoreOnCreate={false}
              accessToken={accessToken}
            />
          </div>
        </div>
      )}
    </>
  );
};
