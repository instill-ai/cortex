import cn from "clsx";
import { FC, ReactElement } from "react";
import { AsyncIcon, SyncIcon } from "@instill-ai/design-system";
import { PipelineMode } from "../lib";

export type ModeCellProps = {
  width: string;
  mode: PipelineMode;
};

export const ModeCell: FC<ModeCellProps> = ({ width, mode }) => {
  let modeIcon: ReactElement;
  const iconStyle = {
    width: "w-5",
    height: "h-5",
    position: "my-auto",
  };

  switch (mode) {
    case "MODE_ASYNC":
      modeIcon = <AsyncIcon {...iconStyle} color="fill-[#FF8A00]" />;
      break;

    case "MODE_SYNC":
      modeIcon = <SyncIcon {...iconStyle} color="fill-instillNeonBlue" />;
      break;

    default:
      modeIcon = <div className={cn(iconStyle.width, iconStyle.height)} />;
      break;
  }

  return (
    <td>
      <div className={cn("mr-auto flex gap-x-[5px]", width)}>
        {modeIcon}
        <p className="text-instillGrey90 text-instill-body">
          {mode === "MODE_ASYNC" ? "Async" : "Sync"}
        </p>
      </div>
    </td>
  );
};
