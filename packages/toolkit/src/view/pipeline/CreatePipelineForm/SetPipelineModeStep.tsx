import * as React from "react";
import {
  useCreateSource,
  useSources,
  sendAmplitudeData,
  useAmplitudeCtx,
  useCreateResourceFormStore,
  prefetchModels,
  useQueryClient,
  type CreateResourceFormStore,
  type CreateSourcePayload,
  type Nullable,
} from "../../../lib";
import {
  AsyncIcon,
  BasicSingleSelect,
  GrpcIcon,
  HttpIcon,
  SingleSelectOption,
  SolidButton,
  SyncIcon,
} from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";

const selector = (state: CreateResourceFormStore) => ({
  pipelineMode: state.fields.pipeline.mode,
  pipelineModeError: state.errors.pipeline.mode,
  existingSourceId: state.fields.source.existing.id,
  existingSourceIdError: state.errors.source.existing.id,
  setFieldValue: state.setFieldValue,
  setPipelineFormStep: state.setPipelineFormStep,
});

export type SetPipelineModeStepProps = {
  accessToken: Nullable<string>;
  syncModelOnly: boolean;
  enabledQuery: boolean;
};

export const SetPipelineModeStep = (props: SetPipelineModeStepProps) => {
  const { accessToken, syncModelOnly, enabledQuery } = props;
  const { amplitudeIsInit } = useAmplitudeCtx();
  const queryClient = useQueryClient();

  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const {
    pipelineMode,
    pipelineModeError,
    existingSourceId,
    existingSourceIdError,
    setFieldValue,
    setPipelineFormStep,
  } = useCreateResourceFormStore(selector, shallow);

  /* -------------------------------------------------------------------------
   * Initialize options
   * -----------------------------------------------------------------------*/

  const sources = useSources({
    accessToken,
    enabled: enabledQuery,
  });

  const [pipelineModeOptions, setPipelineModeOptions] = React.useState<
    SingleSelectOption[]
  >([]);

  const [syncSourceOptions, setSyncSourceOptions] = React.useState<
    SingleSelectOption[]
  >([]);

  // We try to mimic that we will have to fetch these data through internet
  // in the future

  const [selectedPipelineModeOption, setSelectedPipelineModeOption] =
    React.useState<Nullable<SingleSelectOption>>(null);

  React.useEffect(() => {
    const pipelineModeOption = [
      {
        label: "Sync",
        value: "MODE_SYNC",
        startIcon: (
          <SyncIcon
            color="fill-instillGrey90"
            position=""
            width="w-[30px]"
            height="h-[30px]"
          />
        ),
      },
      {
        label: "Async",
        value: "MODE_ASYNC",
        startIcon: (
          <AsyncIcon
            color="fill-instillGrey90"
            position=""
            width="w-[30px]"
            height="h-[30px]"
          />
        ),
      },
    ];

    setPipelineModeOptions(pipelineModeOption);

    const syncSourceOption = [
      {
        label: "gRPC",
        value: "source-grpc",
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
        value: "source-http",
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
    setSyncSourceOptions(syncSourceOption);
    setSelectedPipelineModeOption(pipelineModeOption[0]);
  }, [syncModelOnly]);

  const [selectedSyncSourceOption, setSelectedSyncSourceOption] =
    React.useState<Nullable<SingleSelectOption>>(null);

  /* -------------------------------------------------------------------------
   * Create source if it is not presenting
   * -----------------------------------------------------------------------*/

  const createSource = useCreateSource();

  const canGoNext =
    pipelineMode && sources.isSuccess && selectedSyncSourceOption;

  const handleGoNext = async () => {
    if (!canGoNext) return;

    prefetchModels(queryClient, accessToken, 10 * 1000);

    const sourceIndex = sources.data.findIndex(
      (e) => e.id === selectedSyncSourceOption.value
    );

    if (sourceIndex !== -1) {
      if (amplitudeIsInit) {
        sendAmplitudeData("use_existing_source", {
          type: "critical_action",
          process: "pipeline",
        });
      }
      setFieldValue(
        "source.existing.definition",
        `source-connector-definitions/${selectedSyncSourceOption.value}`
      );
      setFieldValue("source.existing.id", selectedSyncSourceOption.value);
      setFieldValue("source.type", "existing");

      // At the current design, we skip create source step
      setPipelineFormStep(2);
      return;
    }

    const payload: CreateSourcePayload = {
      id: selectedSyncSourceOption.value,
      source_connector_definition: `source-connector-definitions/${selectedSyncSourceOption.value}`,
      connector: {
        configuration: {},
      },
    };

    createSource.mutate(
      { payload, accessToken },
      {
        onSuccess: () => {
          if (amplitudeIsInit) {
            sendAmplitudeData("create_source", {
              type: "critical_action",
              process: "pipeline",
            });
          }

          setFieldValue("pipeline.mode", "MODE_SYNC");
          setFieldValue(
            "source.new.definition",
            `source-connector-definitions/${selectedSyncSourceOption.value}`
          );
          setFieldValue("source.new.id", selectedSyncSourceOption.value);
          setFieldValue("source.type", "new");

          // At the current design, we skip create source step
          //increasePipelineFormStep();
          setPipelineFormStep(2);
        },
      }
    );
  };

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <div className="mb-[60px] flex flex-col gap-y-5">
      <BasicSingleSelect
        id="pipeline-mode"
        label="Pipeline mode"
        description={`<a href=${
          pipelineMode === "MODE_ASYNC"
            ? "https://www.instill.tech/docs/core-concepts/pipeline#async-mode"
            : "https://www.instill.tech/docs/core-concepts/pipeline#sync-mode"
        }>Setup Guide</a>`}
        value={selectedPipelineModeOption}
        options={pipelineModeOptions}
        error={pipelineModeError}
        required={true}
        disabled={syncModelOnly ? true : false}
        onChange={(option: Nullable<SingleSelectOption>) => {
          setSelectedPipelineModeOption(option);
          setFieldValue("pipeline.mode", option?.value);
        }}
      />
      <BasicSingleSelect
        id="existing-source-id"
        label="Source type"
        description={`<a href=${
          existingSourceId === null
            ? "https://www.instill.tech/docs/source-connectors/overview"
            : existingSourceId === "source-http"
            ? "https://www.instill.tech/docs/source-connectors/http"
            : "https://www.instill.tech/docs/source-connectors/grpc"
        }>Setup Guide</a>`}
        value={selectedSyncSourceOption}
        options={syncSourceOptions}
        error={existingSourceIdError}
        onChange={(option: Nullable<SingleSelectOption>) => {
          setSelectedSyncSourceOption(option);
        }}
        disabled={false}
        additionalMessageOnLabel={null}
        readOnly={false}
        required={true}
      />
      <SolidButton
        onClickHandler={handleGoNext}
        disabled={canGoNext ? false : true}
        type="button"
        position="ml-auto"
        color="primary"
      >
        Next
      </SolidButton>
    </div>
  );
};
