import React from "react";
import { PixelCheckIcon, PixelCrossIcon } from "../../Icons";
import NoBgSquareProgress from "../../Progress/NoBgSquareProgress";
import cn from "clsx";
import { Nullable } from "../../../types/general";

export type ProgressMessageBoxBaseProps = {
  status: "success" | "error" | "progressing";

  /**
   *  ProgressMessageBox will return null if the children is null or undefinded
   */
  message: Nullable<string>;

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
  iconPosition: string;

  /** The size of the Square progress */
  progressBlockSize: number;

  /** Indicator background color when error processing
   * - e.g. bg-instillGrey50
   */
  processingIndicatorColumnBgColor: string;

  /** Indicator background color when error occur
   * - e.g. bg-instillGrey50
   */
  errorindicatorColumnBgColor: string;

  /** Indicator background color when success
   * - e.g. bg-instillGrey50
   */
  successIndicatorColumnBgColor: string;

  /** The width of the column that contains the indicator like success icon or progress
   * - e.g. w-12
   */
  indicatorColumnWidth: string;

  /** The top left border radius of the column that contains the indicator like success icon or progress
   * - e.g. rounded-tl-[1px]
   */
  indicatorColumnTopLeftBorderRadius: string;

  /** The bottom left border radius of the column that contains the indicator like success icon or progress
   * - e.g. rounded-bl-[1px]
   */
  indicatorColumnBottomLeftBorderRadius: string;

  /** The background color of the column that contains the message
   * - e.g. bg-instillGrey50
   */
  messageColumnBgColor: string;

  /** The bottom right border of the column that contains the message
   * - e.g. rounded-br-[1px]
   */
  messageColumnBottomRightBorderRadius: string;

  /** The top right border of the column that contains the message
   * - e.g. rounded-tr-[1px]
   */
  messageColumnTopRightBorderRadius: string;

  boxBorderRadius: string;
};

const ProgressMessageBoxBase: React.FC<ProgressMessageBoxBaseProps> = ({
  status,
  width,
  errorIconColor,
  errorIconWidth,
  errorIconHeight,
  successIconColor,
  successIconWidth,
  successIconHeight,
  progressBlockSize,
  iconPosition,
  successIndicatorColumnBgColor,
  processingIndicatorColumnBgColor,
  errorindicatorColumnBgColor,
  indicatorColumnWidth,
  indicatorColumnBottomLeftBorderRadius,
  indicatorColumnTopLeftBorderRadius,
  messageColumnBgColor,
  messageColumnBottomRightBorderRadius,
  messageColumnTopRightBorderRadius,
  boxBorderRadius,
  message,
}) => {
  const statusIcon = React.useMemo(() => {
    if (!message) return null;

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
            position={iconPosition}
          />
        );

      case "success":
        return (
          <PixelCheckIcon
            width={successIconWidth}
            height={successIconHeight}
            position={iconPosition}
            color={successIconColor}
          />
        );
    }
  }, [status]);

  return (
    <div
      className={cn(
        "flex flex-row min-h-[85px] instill-progress-message-box-shadow",
        width,
        boxBorderRadius
      )}
    >
      <div
        className={cn(
          "flex p-2.5",
          indicatorColumnWidth,
          indicatorColumnBottomLeftBorderRadius,
          indicatorColumnTopLeftBorderRadius,
          status === "error"
            ? errorindicatorColumnBgColor
            : status === "success"
            ? successIndicatorColumnBgColor
            : processingIndicatorColumnBgColor
        )}
      >
        {statusIcon}
      </div>
      <div
        className={cn(
          "flex flex-1 p-2.5",
          messageColumnBgColor,
          messageColumnBottomRightBorderRadius,
          messageColumnTopRightBorderRadius
        )}
      >
        <p className="instill-text-h3 text-instillGrey90 break-normal">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ProgressMessageBoxBase;
