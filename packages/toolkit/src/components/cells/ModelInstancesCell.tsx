import cn from "clsx";
import { ModelInstanceIcon } from "@instill-ai/design-system";

export type ModelInstancesCellProps = {
  width: string;
  modelCount: number;
  padding: string;
};

export const ModelInstancesCell = ({
  width,
  modelCount,
  padding,
}: ModelInstancesCellProps) => {
  return (
    <td>
      <div className={cn("flex flex-col", width, padding)}>
        <div className="flex flex-row gap-x-2">
          <ModelInstanceIcon width="w-5" height="h-5" position="my-auto" />
          <p className="my-auto text-instillGrey90 text-instill-body">
            {modelCount}
          </p>
        </div>
      </div>
    </td>
  );
};
