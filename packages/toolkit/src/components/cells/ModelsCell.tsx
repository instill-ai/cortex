import cn from "clsx";
import { ModelInstanceIcon } from "@instill-ai/design-system";
import {
  groupBy,
  Nullable,
  type ModelInstance,
  type ModelState,
} from "../../lib";

export type ModelsCellProps = {
  modelInstances: ModelInstance[];
  width: Nullable<string>;
  padding: string;
};

export const ModelsCell = ({
  width,
  modelInstances,
  padding,
}: ModelsCellProps) => {
  const groupByModel = groupBy(modelInstances, (i) => {
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
