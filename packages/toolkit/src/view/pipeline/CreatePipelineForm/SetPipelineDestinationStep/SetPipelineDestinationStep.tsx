import * as React from "react";
import { shallow } from "zustand/shallow";
import {
  BasicSingleSelect,
  GrpcIcon,
  HttpIcon,
  SingleSelectOption,
  SolidButton,
} from "@instill-ai/design-system";
import {
  useCreateConnector,
  useAmplitudeCtx,
  sendAmplitudeData,
  useCreateResourceFormStore,
  useConnectors,
  type CreateConnectorPayload,
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
  enabledQuery: boolean;
};

export const SetPipelineDestinationStep = (
  props: SetPipelineDestinationStepProps
) => {
  const { accessToken, enabledQuery } = props;
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

  const [syncDestinationOptions, setSyncDestinationOptions] = React.useState<
    SingleSelectOption[]
  >([]);

  const [selectedSyncDestinationOption, setSelectedSyncDestinationOption] =
    React.useState<SingleSelectOption | null>(null);

  const destinations = useConnectors({
    connectorType: "CONNECTOR_TYPE_DESTINATION",
    accessToken,
    enabled: enabledQuery,
  });

  React.useEffect(() => {
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

  const createConnector = useCreateConnector();

  const canGoNext = destinations.isSuccess && selectedSyncDestinationOption;

  const handleGoNext = () => {
    if (!canGoNext) {
      return;
    }

    if (pipelineMode === "MODE_SYNC") {
      const destinationIndex = destinations.data.findIndex(
        (e) => e.id === selectedSyncDestinationOption.value
      );

      setFieldValue(
        "destination.existing.definition",
        `connector-definitions/${selectedSyncDestinationOption.value}`
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
          `connector-definitions/${selectedSyncDestinationOption.value}`
        );
        increasePipelineFormStep();
        return;
      }

      const payload: CreateConnectorPayload = {
        connectorName: `connectors/${selectedSyncDestinationOption.value}`,
        connector_definition: `connector-definitions/${selectedSyncDestinationOption.value}`,
        configuration: {},
      };

      createConnector.mutate(
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
              `connector-definitions/${selectedSyncDestinationOption.value}`
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
            disabled={canGoNext ? false : true}
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
              enabledQuery={enabledQuery}
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
                  `connector-definitions/${id}`
                );
                setFieldValue("destination.type", "new");
                increasePipelineFormStep();
              }}
              title="Setup a new destination"
              formLess={true}
              accessToken={accessToken}
              enabledQuery={enabledQuery}
            />
          </div>
        </div>
      )}
    </>
  );
};
