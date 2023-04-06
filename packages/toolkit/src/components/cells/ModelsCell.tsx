import cn from "clsx";
import { ModelInstanceIcon } from "@instill-ai/design-system";
import { groupBy, type Nullable, type Model } from "../../lib";

export type ModelsCellProps = {
  models: Model[];
  width: Nullable<string>;
  padding: string;
};

export const ModelsCell = ({ width, models, padding }: ModelsCellProps) => {
  const groupByModel = groupBy(models, (i) => {
    const modelInstanceNameList = i.name.split("/");
    return modelInstanceNameList[1];
  });

  return (
    <td>
      <div className={cn("flex flex-col gap-y-4", width, padding)}>
        {Object.entries(groupByModel).map(([key]) => (
          <div key={key} className="flex flex-row gap-x-1">
            <ModelInstanceIcon
              width="w-[30px]"
              height="h-[30px]"
              color="fill-black"
              position="my-auto"
            />
            <p className="my-auto text-instillGrey70 text-instill-small">
              {key}
            </p>
          </div>
        ))}
      </div>
    </td>
  );
};
