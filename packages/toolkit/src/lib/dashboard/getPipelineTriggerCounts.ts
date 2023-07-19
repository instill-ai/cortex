import { SingleSelectOption } from "@instill-ai/design-system";
import { PipelineWithWatchState } from "../type";
import { PipelineTriggerCount, PipelineTriggerRecord } from "../vdp-sdk";
import { defaultTimeOption } from "./options";
import { getDateRange } from "./getDateRange";
import { formatDateTime } from "./formatDateTime";

export function getPipelineTriggerCounts(
  triggers: PipelineTriggerRecord[],
  pipelines: PipelineWithWatchState[] = [],
  selectedTimeOption: SingleSelectOption = defaultTimeOption
): PipelineTriggerCount[] {
  const pipelinesTriggerCount: PipelineTriggerCount[] = [];

  triggers.forEach((trigger) => {
    const triggerTime = formatDateTime(
      trigger.trigger_time,
      selectedTimeOption.value
    );

    const pipelineId = trigger.pipeline_id;

    const existingPipelineCount = pipelinesTriggerCount.find(
      (entry) => entry.pipeline_id === pipelineId
    );

    if (existingPipelineCount) {
      const existingCount = existingPipelineCount.counts.find(
        (countEntry) => countEntry.trigger_time === triggerTime
      );
      if (existingCount) {
        existingCount.count += 1;
      } else {
        existingPipelineCount.counts.push({
          trigger_time: triggerTime,
          count: 1,
        });
      }
      if (trigger.status === "STATUS_ERRORED") {
        existingPipelineCount.pipeline_errored += 1;
      }
      if (trigger.status === "STATUS_COMPLETED") {
        existingPipelineCount.pipeline_completed += 1;
      }
    } else {
      const targetPipeline = pipelines.find(
        (pipeline) => pipeline.uid === trigger.pipeline_uid
      );

      const newPipelineTriggerCount: PipelineTriggerCount = {
        pipeline_id: pipelineId,
        pipeline_completed: trigger.status === "STATUS_COMPLETED" ? 1 : 0,
        pipeline_errored: trigger.status === "STATUS_ERRORED" ? 1 : 0,
        pipeline_uid: trigger.pipeline_uid,
        counts: [{ trigger_time: triggerTime, count: 1 }],
        watchState: targetPipeline
          ? targetPipeline.watchState
          : "STATE_UNSPECIFIED",
      };
      pipelinesTriggerCount.push(newPipelineTriggerCount);
    }
  });

  // Add missing trigger times with count 0 for each pipeline
  const allTriggerTimes = getDateRange(selectedTimeOption.value);

  const uniqueTriggerTimes = [...new Set(allTriggerTimes)];

  pipelinesTriggerCount.forEach((pipeline) => {
    uniqueTriggerTimes.forEach((triggerTime) => {
      const existingCount = pipeline.counts.find(
        (countEntry) => countEntry.trigger_time === triggerTime
      );
      if (!existingCount) {
        pipeline.counts.push({ trigger_time: triggerTime, count: 0 });
      }
    });
  });

  return pipelinesTriggerCount;
}
