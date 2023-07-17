import {
  PipelineTriggerRecord,
  PipelineTriggersStatusSummary,
} from "../vdp-sdk";
import { calculatePercentageDelta } from "./calculatePercentageDelta";
import { getPipelineTriggerCounts } from "./getPipelineTriggerCounts";

export function getPipelineTriggersSummary(
  triggers: PipelineTriggerRecord[],
  triggersPrevious: PipelineTriggerRecord[]
): PipelineTriggersStatusSummary {
  let pipelineCompleteAmount = 0;
  let pipelineCompleteAmountPrevious = 0;
  let pipelineErroredAmount = 0;
  let pipelineErroredAmountPrevious = 0;

  getPipelineTriggerCounts(triggers).forEach((trigger) => {
    pipelineCompleteAmount += trigger.pipeline_completed;
    pipelineErroredAmount += trigger.pipeline_errored;
  });

  getPipelineTriggerCounts(triggersPrevious).forEach((trigger) => {
    pipelineCompleteAmountPrevious += trigger.pipeline_completed;
    pipelineErroredAmountPrevious += trigger.pipeline_errored;
  });

  return {
    completed: {
      statusType: "STATUS_COMPLETED",
      amount: pipelineCompleteAmount,
      type: "pipeline",
      delta: calculatePercentageDelta(
        pipelineCompleteAmountPrevious,
        pipelineCompleteAmount
      ),
    },
    errored: {
      statusType: "STATUS_ERRORED",
      amount: pipelineErroredAmount,
      type: "pipeline",
      delta: calculatePercentageDelta(
        pipelineErroredAmountPrevious,
        pipelineErroredAmount
      ),
    },
  };
}
