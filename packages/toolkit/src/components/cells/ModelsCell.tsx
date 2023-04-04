import cn from "clsx";
import { ModelInstanceIcon } from "@instill-ai/design-system";
import { groupBy, Nullable, type Model, type ModelState } from "../../lib";

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

  const getStateTextColor = (state: ModelState) => {
    switch (state) {
      case "STATE_ERROR": {
        return "text-instillRed";
      }
      case "STATE_OFFLINE": {
        return "text-instillGrey70";
      }
      default: {
        return "text-instillGreen50";
      }
    }
  };

  return (
    <td>
      <div className={cn("flex flex-col gap-y-4", width, padding)}>
        {Object.entries(groupByModel).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-y-2">
            <div className="flex flex-row gap-x-1">
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
            <div className="flex flex-col gap-y-1">
              {value.map((e) => (
                <div
                  key={e.id}
                  className={cn(
                    "text-instill-body",
                    getStateTextColor(e.state)
                  )}
                >{`${key}/${e.id}`}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </td>
  );
};
