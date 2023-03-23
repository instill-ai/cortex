import { useEffect, useMemo, useState } from "react";
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
} from "../../../../lib";

import { FormVerticalDivider } from "../FormVerticalDivider";
import { UseExistingDestinationFlow } from "./UseExistingDestinationFlow";
import { shallow } from "zustand/shallow";
import { CreateDestinationForm } from "../../../destination";

const selector = (state: CreateResourceFormStore) => ({
  pipelineMode: state.fields.pipeline.mode,
  existingSourceId: state.fields.source.existing.id,
  existingDestinationId: state.fields.destination.existing.id,
  existingDestinationIdError: state.errors.destination.existing.id,
  increasePipelineFormStep: state.increasePipelineFormStep,
  setFieldValue: state.setFieldValue,
  s: state.fields.source.type,
});

export const SetPipelineDestinationStep = () => {
  const { amplitudeIsInit } = useAmplitudeCtx();

  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const {
    pipelineMode,
    existingSourceId,
    existingDestinationId,
    existingDestinationIdError,
    increasePipelineFormStep,
    setFieldValue,
  } = useCreateResourceFormStore(selector, shallow);

  /* -------------------------------------------------------------------------
   * Initialize destination definition and options
   * -----------------------------------------------------------------------*/

  const [syncDestinationOptions, setSyncDestinationOptions] = useState<
    SingleSelectOption[]
  >([]);

  useEffect(() => {
    setSyncDestinationOptions([
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
    ]);
  }, []);

  const selectedSyncDestinationOption = useMemo(() => {
    if (syncDestinationOptions.length === 0 || !existingDestinationId) {
      return null;
    }

    return (
      syncDestinationOptions.find((e) => e.value === existingDestinationId) ||
      null
    );
  }, [existingDestinationId, syncDestinationOptions]);

  /* -------------------------------------------------------------------------
   * Choose the default destination as same as source when the pipeline is
   * in sync mode
   * -----------------------------------------------------------------------*/

  useEffect(() => {
    if (pipelineMode !== "MODE_SYNC" || !existingSourceId) {
      return;
    }
    const destinationId = existingSourceId.replace("source", "destination");
    setFieldValue("destination.existing.id", destinationId);
  }, [pipelineMode, existingSourceId, syncDestinationOptions, setFieldValue]);

  /* -------------------------------------------------------------------------
   * Create target destination.
   * We have to make sure there has no duplicated destination
   * -----------------------------------------------------------------------*/

  const createDestination = useCreateDestination();
  const destinations = useDestinations({ accessToken: null });

  const handleGoNext = () => {
    if (!destinations.isSuccess || !existingDestinationId) {
      return;
    }

    if (pipelineMode === "MODE_SYNC") {
      const destinationIndex = destinations.data.findIndex(
        (e) => e.id === existingDestinationId
      );

      setFieldValue(
        "destination.existing.definition",
        `destination-connector-definitions/${existingDestinationId}`
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
          "destination.existing.definition",
          `destination-connector-definitions/${existingDestinationId}`
        );
        increasePipelineFormStep();
        return;
      }

      const payload: CreateDestinationPayload = {
        id: existingDestinationId,
        destination_connector_definition: `destination-connector-definitions/${existingDestinationId}`,
        connector: {
          configuration: {},
        },
      };

      createDestination.mutate(
        { payload, accessToken: null },
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
              "destination.new.definition",
              `destination-connector-definitions/${existingDestinationId}`
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
            id="existingDestinationId"
            label="Destination type"
            description={
              "With the selection of Sync mode for the Pipeline, the destination will be the same as the source. <a href='https://www.instill.tech/docs/core-concepts/pipeline#sync-mode'>Learn more →</a>"
            }
            options={syncDestinationOptions}
            value={selectedSyncDestinationOption}
            error={existingDestinationIdError}
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
          <UseExistingDestinationFlow />
          <FormVerticalDivider />
          <CreateDestinationForm
            onCreate={(id: string) => {
              setFieldValue("destination.new.id", id);
              increasePipelineFormStep();
            }}
            title="Setup a new destination"
            formLess={true}
            marginBottom={null}
            initStoreOnCreate={false}
          />
        </div>
      )}
    </>
  );
};
