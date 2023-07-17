import cn from "clsx";
import { Tag } from "@instill-ai/design-system";
import { ReactElement } from "react";
import { Nullable, PipelineTriggerStatus, ResourceState } from "../../lib";

export type GeneralStateCellProps = {
  state: ResourceState | PipelineTriggerStatus;
  width: Nullable<string>;
  padding: string;
};

export const GeneralStateCell = ({
  state,
  width,
  padding,
}: GeneralStateCellProps) => {
  let element: Nullable<ReactElement> = null;

  switch (state) {
    case "STATE_ERROR":
    case "STATUS_ERRORED":
      element = (
        <Tag variant="lightRed" size="sm">
          Error
        </Tag>
      );
      break;

    case "STATE_ACTIVE":
    case "STATUS_COMPLETED":
      element = (
        <Tag variant="lightGreen" size="sm">
          Active
        </Tag>
      );
      break;

    case "STATE_INACTIVE":
      element = (
        <Tag variant="default" size="sm">
          Inactive
        </Tag>
      );
      break;

    default:
      element = (
        <Tag variant="default" size="sm">
          Unspecific
        </Tag>
      );
  }

  return (
    <td>
      <div className={cn("flex flex-row", width, padding)}>{element}</div>
    </td>
  );
};
