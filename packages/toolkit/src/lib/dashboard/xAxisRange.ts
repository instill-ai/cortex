import { PipelineTriggerCount } from "../vdp-sdk";
import { formatDateTime } from "./formatDateTime";
import { getDateRange } from "./getDateRange";
import { orderCountsByTriggerTime } from "./orderCountsByTriggerTime";

export function xAxisRange(
  triggers: PipelineTriggerCount[],
  range: string
): string[] {
  let dates: string[] = [];

  triggers.forEach((trigger) => {
    dates = [
      ...orderCountsByTriggerTime(trigger.counts).map((trigger) =>
        formatDateTime(trigger.trigger_time.toString(), range)
      ),
      ...dates,
    ];
  });

  if (dates.length) {
    return [...new Set(dates)];
  }
  return getDateRange(range);
}
