import cn from "clsx";
import { ModelInstanceIcon } from "@instill-ai/design-system";

export type PipelinesCellProps = {
  width: string;
  pipelineCount: number;
};

export const PipelinesCell = ({ width, pipelineCount }: PipelinesCellProps) => {
  return (
    <td>
      <div className={cn("flex flex-col", width)}>
        <div className="flex flex-row gap-x-[5px]">
          <ModelInstanceIcon width="w-5" height="h-5" position="my-auto" />
          <p className="my-auto text-instillGrey90 text-instill-body">
            {pipelineCount}
          </p>
        </div>
      </div>
    </td>
  );
};
