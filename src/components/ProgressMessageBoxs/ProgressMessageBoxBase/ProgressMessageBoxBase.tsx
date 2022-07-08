import React, { Dispatch, SetStateAction } from "react";
import { PixelCheckIcon, PixelCrossIcon, XIcon } from "../../Icons";
import NoBgSquareProgress from "../../Progress/NoBgSquareProgress";
import cn from "clsx";
import { Nullable } from "../../../types/general";

export type ProgressMessageBoxState = {
  status: "success" | "error" | "progressing";
  /**
   *  ProgressMessageBox's message
   */
  message: Nullable<string>;
  /**
   * ProgressMessageBox's description
   */
  description: Nullable<string>;

  /**
   * Show message box or not
   */
  activate: boolean;
};

export type ProgressMessageBoxBaseProps = {
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

  /**
   * Whether the message box can be closed or not
   */
  closable: boolean;

  state: ProgressMessageBoxState;

  setState: Dispatch<SetStateAction<ProgressMessageBoxState>>;
};

const ProgressMessageBoxBase: React.FC<ProgressMessageBoxBaseProps> = ({
  state,
  setState,
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
  closable,
}) => {
  const statusIcon = React.useMemo(() => {
    switch (state.status) {
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
            isLoading={true}
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
  }, [state.status]);

  return (
    <>
      {state.activate ? (
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
              "flex flex-row flex-1 pl-[15px] pr-2.5 py-2.5",
              messageColumnBgColor,
              messageColumnBottomRightBorderRadius,
              messageColumnTopRightBorderRadius
            )}
          >
            <div className="flex flex-col flex-1 gap-y-[5px]">
              <h3 className="text-instill-h3 text-instillGrey90 break-normal">
                {state.message}
              </h3>
              <p className="text-instillGrey70 text-instill-small">
                {state.description}
              </p>
            </div>
            {closable ? (
              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    activate: false,
                  }))
                }
                className="flex mb-auto"
              >
                <XIcon
                  position="m-auto"
                  color="fill-instillGrey30"
                  width="w-4"
                  height="h-4"
                />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProgressMessageBoxBase;
