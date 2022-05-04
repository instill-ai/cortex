import { FC, useMemo } from "react";
import { PixelCheckIcon, PixelCrossIcon } from "../../Icons";
import NoBgSquareProgress from "../../Progress/NoBgSquareProgress";
import cn from "clsx";

export type ProgressMessageBoxBaseProps = {
  status: "success" | "error" | "progressing";

  /** The width of the whole message box
   * - e.g. w-120
   */
  width: string;

  /**
   * Error icon color
   * - e.g. fill-instillRed
   */
  errorIconColor: string;

  /**
   * Error icon width
   * - e.g. w-4
   */
  errorIconWidth: string;

  /**
   * Error icon height
   * - e.g. h-4
   */
  errorIconHeight: string;

  /**
   * Success icon color
   * - e.g. fill-instillRed
   */
  successIconColor: string;

  /**
   * Success icon width
   * - e.g. w-4
   */
  successIconWidth: string;

  /**
   * Success icon height
   * - e.g. h-4
   */
  successIconHeight: string;

  /** The position of the Icon
   * - e.g. mx-auto
   */
  IconPosition: string;

  /** The size of the Square progress */
  progressBlockSize: number;

  /** The background color of the column that contains the indicator like success icon or progress
   * - e.g. bg-instillGrey50
   */
  IndicatorColumnBgColor: string;

  /** The width of the column that contains the indicator like success icon or progress
   * - e.g. w-12
   */
  IndicatorColumnWidth: string;

  /** The background color under the message
   * - e.g. bg-instillGrey50
   */
  messageColumnBgColor: string;
};

const ProgressMessageBoxBase: FC<ProgressMessageBoxBaseProps> = ({
  status,
  children,
  width,
  errorIconColor,
  errorIconWidth,
  errorIconHeight,
  successIconColor,
  successIconWidth,
  successIconHeight,
  progressBlockSize,
  IconPosition,
  IndicatorColumnBgColor,
  IndicatorColumnWidth,
  messageColumnBgColor,
}) => {
  const statusIcon = useMemo(() => {
    switch (status) {
      case "error":
        return (
          <PixelCrossIcon
            width={errorIconWidth}
            height={errorIconHeight}
            position="mx-auto mb-auto"
            color={errorIconColor}
          />
        );
      case "progressing":
        return (
          <NoBgSquareProgress
            isLoading={status === "progressing" ? true : false}
            blockSize={progressBlockSize}
            position={IconPosition}
          />
        );

      case "success":
        return (
          <PixelCheckIcon
            width={successIconWidth}
            height={successIconHeight}
            position={IconPosition}
            color={successIconColor}
          />
        );
    }
  }, [status]);

  return (
    <div className={cn("flex flex-row min-h-[85px]", width)}>
      <div
        className={cn(
          "flex p-2.5",
          IndicatorColumnWidth,
          IndicatorColumnBgColor
        )}
      >
        {statusIcon}
      </div>
      <div className={cn("flex flex-1 p-2.5", messageColumnBgColor)}>
        <p className="instill-text-h3 text-instillGrey90 break-normal">
          {children}
        </p>
      </div>
    </div>
  );
};

export default ProgressMessageBoxBase;
