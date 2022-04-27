import React from "react";
import { BasicInputFieldAttributes } from "../../../types/general";
import cn from "clsx";
import { DocIcon } from "../../Icons";
import InputLabelBase from "../../InputLabels/InputLabelBase";
import InputDescriptionBase from "../../InputDescriptions/InputDescriptionBase";
import { getElementPosition } from "../../../utils";

export type UploadFileFieldBaseProps = Omit<
  BasicInputFieldAttributes,
  | "autoComplete"
  | "bgColor"
  | "inputBorderRadius"
  | "disabledCursor"
  | "readOnlyCursor"
  | "placeholderFontFamily"
  | "placeholderFontSize"
  | "placeholderFontWeight"
  | "placeholderLineHeight"
  | "placeholderTextColor"
> & {
  /** Text display on upload button */
  uploadButtonText: string;

  /** TailwindCSS format
   * - e.g. bg-instillGrey50
   */
  uploadButtonBgColor: string;

  /** TailwindCSS format
   * - e.g. text-instillGrey05
   */
  uploadButtonTextColor: string;

  /** TailwindCSS format - Input's top right border radius
   * - e.g. rounded-tr-[1px]
   */
  inputBorderRadiusTopRight: string;

  /** TailwindCSS format - Input's bottom right border radius
   * - e.g. rounded-br-[1px]
   */
  inputBorderRadiusBottomRight: string;

  /** TailwindCSS format - Input's top left border radius
   * - e.g. rounded-tl-[1px]
   */
  inputBorderRadiusTopLeft: string;

  /** TailwindCSS format - Input's bottom left border radius
   * - e.g. rounded-bl-[1px]
   */
  inputBorderRadiusBottomLeft: string;
};

const UploadFileFieldBase: React.FC<UploadFileFieldBaseProps> = ({
  id,
  label,
  error,
  inputLabelType,
  description,
  required,
  inputWidth,
  inputHeight,
  uploadButtonText,
  uploadButtonBgColor,
  uploadButtonTextColor,
  inputBorderRadiusTopRight,
  inputBorderRadiusBottomRight,
  inputBorderRadiusTopLeft,
  inputBorderRadiusBottomLeft,
  inputFontSize,
  inputFontWeight,
  inputLineHeight,
  inputTextColor,
  onChangeInput,
  disabled,
  readOnly,
  inputBorderColor,
  inputBorderStyle,
  inputBorderWidth,
  focusHighlight,
  labelFontFamily,
  labelFontSize,
  labelFontWeight,
  labelLineHeight,
  labelTextColor,
  labelActivateStyle,
  labelDeActivateStyle,
  descriptionFontFamily,
  descriptionFontSize,
  descriptionFontWeight,
  descriptionLineHeight,
  descriptionTextColor,
  errorInputBgColor,
  errorInputBorderColor,
  errorInputBorderStyle,
  errorInputBorderWidth,
  errorInputTextColor,
  errorLabelFontFamily,
  errorLabelFontSize,
  errorLabelFontWeight,
  errorLabelLineHeight,
  errorLabelTextColor,
  disabledInputBgColor,
  disabledInputBorderColor,
  disabledInputBorderStyle,
  disabledInputBorderWidth,
  disabledInputTextColor,
  readOnlyInputBgColor,
  readOnlyInputBorderColor,
  readOnlyInputBorderStyle,
  readOnlyInputBorderWidth,
  readOnlyInputTextColor,
}) => {
  const [answered, setAnswered] = React.useState(false);
  const [file, setFile] = React.useState<string>("");
  const [inputLabelWidth, setInputLabelWidth] = React.useState<number>(null);
  const [containerHeight, setContainerHeight] = React.useState<number>(null);

  /**
   * We use these ref to calculate the width and height of the container
   * when there has very long error message which make label overflow.
   * - When component is mount we calculate the label width
   * - When error prop is changed we calculate the container height and compare it with original
   *   container height, is former is greater, we adapt new container height
   */

  /**
   * The wrapper of inputValueRef have a conditional rendering style, we use absolute bottom-5
   * combine with inputLabel's top-5 to center the label and value, and we use mb-auto to shrink
   * the wrapper itself
   *
   * ```js
   *  inputLabelType === "inset"
   *    ? cn("pt-8", containerHeight ? "absolute bottom-5" : "mb-auto")
   *    : "my-auto"
   * ```
   *
   */

  const mainContainerRef = React.useRef<HTMLLabelElement>(null);
  const uploadButtonRef = React.useRef<HTMLDivElement>(null);
  const inputLabelRef = React.useRef<HTMLLabelElement>(null);
  const inputValueRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (
      !mainContainerRef.current ||
      !uploadButtonRef.current ||
      inputLabelType !== "inset"
    ) {
      return;
    }

    const mainContainerPosition = getElementPosition(mainContainerRef.current);
    const uploadButtonPosition = getElementPosition(uploadButtonRef.current);

    const inputLabelPaddingWidth = 20;

    const inputLabelWidth =
      mainContainerPosition.width -
      uploadButtonPosition.width -
      inputLabelPaddingWidth * 2;

    console.log("re-calculate label width", inputLabelWidth);

    setInputLabelWidth(inputLabelWidth);
  }, [mainContainerRef, uploadButtonRef, inputLabelType]);

  React.useEffect(() => {
    if (
      !error ||
      !mainContainerRef ||
      !inputLabelRef ||
      !inputValueRef ||
      !inputValueRef.current ||
      inputLabelType !== "inset"
    ) {
      setContainerHeight(null);
      return;
    }

    const inputLabelPosition = getElementPosition(inputLabelRef.current);
    const mainContainerPosition = getElementPosition(mainContainerRef.current);
    const inputValuePosition = getElementPosition(inputValueRef.current);

    const inputLabelPaddingY = 20;
    const gapBetweenLabelAndValue = 10;

    const inputLabelHeight =
      inputLabelPosition.height +
      inputLabelPaddingY * 2 +
      inputValuePosition.height +
      gapBetweenLabelAndValue;

    if (inputLabelHeight > mainContainerPosition.height) {
      setContainerHeight(inputLabelHeight);
    } else {
      setContainerHeight(null);
    }
  }, [error, inputLabelRef, inputValueRef, inputLabelType]);

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col gap-y-2.5 group mb-2.5">
        <InputLabelBase
          ref={inputLabelRef}
          answered={disabled ? true : readOnly ? true : answered}
          required={required}
          htmlFor={id}
          type={inputLabelType}
          label={label}
          labelWidth={inputLabelWidth}
          error={error}
          labelFontFamily={labelFontFamily}
          labelFontSize={labelFontSize}
          labelFontWeight={labelFontWeight}
          labelLineHeight={labelLineHeight}
          labelTextColor={labelTextColor}
          labelActivateStyle={labelActivateStyle}
          labelDeActivateStyle={labelDeActivateStyle}
          errorLabelFontFamily={errorLabelFontFamily}
          errorLabelFontSize={errorLabelFontSize}
          errorLabelFontWeight={errorLabelFontWeight}
          errorLabelLineHeight={errorLabelLineHeight}
          errorLabelTextColor={errorLabelTextColor}
        />
        <label
          ref={mainContainerRef}
          style={{ height: containerHeight ? `${containerHeight}px` : "" }}
          className={cn(
            "flex flex-row p-0 cursor-pointer relative",
            inputWidth,
            inputHeight,
            inputBorderRadiusBottomLeft,
            inputBorderRadiusBottomRight,
            inputBorderRadiusTopLeft,
            inputBorderRadiusTopRight,
            error
              ? cn(
                  errorInputBorderColor,
                  errorInputBorderStyle,
                  errorInputBorderWidth,
                  errorInputBgColor
                )
              : disabled
              ? cn(
                  "instill-input-no-highlight",
                  disabledInputBorderColor,
                  disabledInputBorderStyle,
                  disabledInputBorderWidth,
                  disabledInputBgColor
                )
              : readOnly
              ? cn(
                  "instill-input-no-highlight",
                  readOnlyInputBorderColor,
                  readOnlyInputBorderStyle,
                  readOnlyInputBorderWidth,
                  readOnlyInputBgColor
                )
              : focusHighlight
              ? cn(
                  inputBorderWidth,
                  inputBorderColor,
                  inputBorderStyle,
                  "instill-input-highlight"
                )
              : cn(
                  inputBorderColor,
                  inputBorderStyle,
                  inputBorderWidth,
                  "instill-input-no-highlight"
                )
          )}
          htmlFor={id}
        >
          <div
            className={cn(
              "flex mr-auto pl-5",
              inputLabelType === "inset"
                ? cn("pt-8", containerHeight ? "absolute bottom-5" : "mb-auto")
                : "my-auto"
            )}
          >
            {file ? (
              <div ref={inputValueRef} className="flex flex-row gap-x-2.5">
                <DocIcon
                  width="w-5"
                  height="h-5"
                  position="my-auto"
                  color={
                    error
                      ? errorInputTextColor
                      : disabled
                      ? disabledInputTextColor
                      : readOnly
                      ? readOnlyInputTextColor
                      : inputTextColor
                  }
                />

                <div
                  className={cn(
                    inputFontSize,
                    inputLineHeight,
                    inputFontWeight,
                    error
                      ? errorInputTextColor
                      : disabled
                      ? disabledInputTextColor
                      : readOnly
                      ? readOnlyInputTextColor
                      : inputTextColor,
                    "flex"
                  )}
                >
                  {file.split("\\").slice(-1)[0]}
                </div>
              </div>
            ) : null}
          </div>
          <input
            className={cn(
              "opacity-0 overflow-hidden absolute z-10",
              inputHeight,
              inputWidth,
              disabled
                ? "cursor-not-allowed"
                : readOnly
                ? "cursor-auto"
                : "cursor-pointer"
            )}
            aria-label={`${id}-label`}
            id={id}
            type="file"
            disabled={disabled}
            readOnly={readOnly}
            onChange={(event) => {
              const inputValue = event.target.value;
              const inputFile = event.target.files[0] || null;

              if (!inputValue) {
                setAnswered(false);
                return;
              }

              setAnswered(true);
              setFile(inputValue);

              if (inputFile) {
                onChangeInput(inputFile);
              }
            }}
            onClick={(event) => {
              if (readOnly) {
                event.preventDefault();
                event.stopPropagation();
                return false;
              }
            }}
          />
          <div
            ref={uploadButtonRef}
            className={cn(
              "flex h-full ml-auto px-5",
              answered ? "absolute bottom-0 right-0 z-20" : "",
              uploadButtonBgColor,
              uploadButtonTextColor,
              inputBorderRadiusTopRight,
              inputBorderRadiusBottomRight,
              disabled
                ? "bg-instillGrey20 cursor-not-allowed"
                : readOnly
                ? "bg-instillGrey20 cursor-auto"
                : "bg-instillGrey50 group-hover:bg-instillGrey30 cursor-pointer"
            )}
            onClick={(event) => {
              if (readOnly || disabled) return;

              if (answered) {
                event.preventDefault();
                setFile(null);
                setAnswered(false);
                onChangeInput(null);
              }
            }}
          >
            <span className="m-auto">
              {answered ? "Delete" : uploadButtonText}
            </span>
          </div>
        </label>
      </div>
      <InputDescriptionBase
        description={description}
        descriptionFontFamily={descriptionFontFamily}
        descriptionFontSize={descriptionFontSize}
        descriptionFontWeight={descriptionFontWeight}
        descriptionLineHeight={descriptionLineHeight}
        descriptionTextColor={descriptionTextColor}
      />
    </div>
  );
};

export default UploadFileFieldBase;
