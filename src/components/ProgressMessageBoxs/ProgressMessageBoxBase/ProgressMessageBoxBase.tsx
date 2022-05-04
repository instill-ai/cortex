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
  iconPosition: string;

  /** The size of the Square progress */
  progressBlockSize: number;

  /** The background color of the column that contains the indicator like success icon or progress
   * - e.g. bg-instillGrey50
   */
  indicatorColumnBgColor: string;

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
  iconPosition,
  indicatorColumnBgColor,
  indicatorColumnWidth,
  indicatorColumnBottomLeftBorderRadius,
  indicatorColumnTopLeftBorderRadius,
  messageColumnBgColor,
  messageColumnBottomRightBorderRadius,
  messageColumnTopRightBorderRadius,
  boxBorderRadius,
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
          indicatorColumnBgColor,
          indicatorColumnBottomLeftBorderRadius,
          indicatorColumnTopLeftBorderRadius
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
          {children}
        </p>
      </div>
    </div>
  );
};

export default ProgressMessageBoxBase;
