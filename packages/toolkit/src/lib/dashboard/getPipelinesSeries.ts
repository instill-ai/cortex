import { PipelineTriggerCount } from "../vdp-sdk";
import { orderCountsByTriggerTime } from "./orderCountsByTriggerTime";

export function getPipelinesSeries(triggers: PipelineTriggerCount[]) {
  return triggers.map((trigger) => {
    return {
      name: trigger.pipeline_id,
      type: "line",
      smooth: true,
      data: orderCountsByTriggerTime(trigger.counts).map(
        (trigger) => trigger.count
      ),
    };
  });
}
