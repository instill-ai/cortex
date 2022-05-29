import React from "react";
import cn from "clsx";
import { BasicInputFieldAttributes, Nullable } from "../../../types/general";
import InputLabelBase from "../../InputLabels/InputLabelBase";
import InputDescriptionBase from "../../InputDescriptions/InputDescriptionBase";
import { getElementPosition, getTailwindClassNumber } from "../../../utils";

export type TextAreaBaseProps = Omit<
  BasicInputFieldAttributes,
  "labelActivateStyle" | "labelDeActivateStyle"
> & {
  /** Textarea value */
  value: Nullable<string>;

  /** Control how textarea can be resized
   * This component currently not support resize
   */
  // resize: "both" | "none" | "x" | "y";

  /** Enable textarea words counter */
  enableCounter: boolean;

  /** Textarea counter's words limit */
  counterWordLimit: number;

  /** TailwindCSS format - Font size of textarea's counter
   * - e.g. text-base
   * - https://tailwindcss.com/docs/font-size
   */
  counterFontSize: string;

  /** TailwindCSS format - Font family of textarea's counter
   * - e.g. font-sans
   * - https://tailwindcss.com/docs/font-family
   */
  counterFontFamily: string;

  /** TailwindCSS format - Font weight of textarea's counter
   * - e.g. font-normal
   * - https://tailwindcss.com/docs/font-weight
   */
  counterFontWeight: string;

  /** TailwindCSS format - Text color of textarea's counter
   * - e.g. text-instillGrey50
   * - https://tailwindcss.com/docs/text-color
   */
  counterTextColor: string;

  /** TailwindCSS format - Line height of textarea's counter
   * - e.g. leading-normal
   * - https://tailwindcss.com/docs/line-height
   */
  counterLineHeight: string;
};

const TextAreaBase: React.FC<TextAreaBaseProps> = ({
  id,
  value,
  onChangeInput,
  required,
  description,
  error,
  label,
  inputFontSize,
  inputTextColor,
  inputFontWeight,
  inputLineHeight,
  bgColor,
  inputWidth,
  inputHeight,
  autoComplete,
  focusHighlight,
  disabled,
  disabledCursor,
  disabledInputBgColor,
  disabledInputBorderColor,
  disabledInputBorderStyle,
  disabledInputBorderWidth,
  disabledInputTextColor,
  readOnly,
  readOnlyCursor,
  readOnlyInputBgColor,
  readOnlyInputBorderColor,
  readOnlyInputBorderStyle,
  readOnlyInputBorderWidth,
  readOnlyInputTextColor,
  placeholder,
  placeholderFontFamily,
  placeholderFontSize,
  placeholderFontWeight,
  placeholderLineHeight,
  placeholderTextColor,
  // resize,
  inputLabelType,
  inputBorderRadius,
  inputBorderColor,
  inputBorderStyle,
  inputBorderWidth,
  enableCounter,
  counterWordLimit,
  counterFontFamily,
  counterFontSize,
  counterFontWeight,
  counterLineHeight,
  counterTextColor,
  labelFontFamily,
  labelFontSize,
  labelFontWeight,
  labelLineHeight,
  labelTextColor,
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
}) => {
  const [focus, setFocus] = React.useState(false);
  const [answered, setAnswered] = React.useState(false);

  // let resizeStyle: string;

  // switch (resize) {
  //   case "both":
  //     resizeStyle = "resize";
  //     break;
  //   case "none":
  //     resizeStyle = "resize-none";
  //     break;
  //   case "x":
  //     resizeStyle = "resize-x";
  //     break;
  //   case "y":
  //     resizeStyle = "resize-y";
  //     break;
  // }

  const [inputLabelWidth, setInputLabelWidth] =
    React.useState<Nullable<number>>(null);
  const [containerHeight, setContainerHeight] =
    React.useState<Nullable<number>>(null);
  const [containerPaddingTop, setContainerPaddingTop] =
    React.useState<Nullable<number>>(null);

  /**
   * We use these ref to calculate the width and height of the container
   * - it calculate the container height no matter whether the error is present
   * - inputLabel have fixed activate and deActivate style.
   */

  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const inputLabelRef = React.useRef<HTMLLabelElement>(null);

  React.useEffect(() => {
    if (!focus || !inputRef || !inputRef.current) return;

    inputRef.current.focus();
  }, [focus]);

  React.useEffect(() => {
    if (!inputRef.current || inputLabelType !== "inset") {
      return;
    }

    const mainContainerPosition = getElementPosition(inputRef.current);

    const inputLabelPaddingWidth = 20;

    const inputLabelWidth =
      mainContainerPosition.width - inputLabelPaddingWidth * 2;

    setInputLabelWidth(inputLabelWidth);
  }, [inputRef, inputLabelType]);

  React.useEffect(() => {
    if (
      !inputRef ||
      !inputLabelRef ||
      !inputRef.current ||
      !inputLabelRef.current
    ) {
      setContainerHeight(getTailwindClassNumber(inputHeight));
      setContainerPaddingTop(0);
      return;
    }

    const inputLabelPosition = getElementPosition(inputLabelRef.current);
    const mainContainerPosition = getElementPosition(inputRef.current);

    const inputLabelPaddingY = 20;
    const gapBetweenLabelAndValue = 10;
    const textAreaMarginBottom = 5; // Avoid textarea cover container border

    const containerHeight =
      inputLabelPosition.height +
      (inputLabelType === "inset"
        ? inputLabelPaddingY + textAreaMarginBottom
        : 0) +
      getTailwindClassNumber(inputHeight) +
      gapBetweenLabelAndValue;

    if (containerHeight > mainContainerPosition.height) {
      setContainerHeight(containerHeight);
      setContainerPaddingTop(
        inputLabelPosition.height + inputLabelPaddingY + gapBetweenLabelAndValue
      );
    } else {
      setContainerHeight(getTailwindClassNumber(inputHeight));
      setContainerPaddingTop(0);
    }
  }, [error, inputLabelRef, inputLabelType]);

  const getInputStyle = error
    ? cn(
        errorInputBgColor,
        errorInputBorderColor,
        errorInputBorderStyle,
        errorInputBorderWidth,
        errorInputTextColor,
        "instill-input-no-highlight"
      )
    : disabled
    ? cn(
        disabledCursor,
        disabledInputBgColor,
        disabledInputBorderColor,
        disabledInputBorderStyle,
        disabledInputBorderWidth,
        disabledInputTextColor,
        "instill-input-no-highlight"
      )
    : readOnly
    ? cn(
        readOnlyCursor,
        readOnlyInputBgColor,
        readOnlyInputBorderColor,
        readOnlyInputBorderStyle,
        readOnlyInputBorderWidth,
        readOnlyInputTextColor,
        "instill-input-no-highlight"
      )
    : focusHighlight
    ? focus
      ? cn(
          inputBorderWidth,
          inputBorderStyle,
          "outline-none ring-0 ring-white border-instillBlue50 instill-input-focus-shadow cursor-text"
        )
      : cn(inputBorderColor, inputBorderStyle, inputBorderWidth, "cursor-text")
    : cn(inputBorderColor, inputBorderStyle, inputBorderWidth, "cursor-text");

  return (
    <div className="flex flex-col">
      <div
        onClick={() => {
          if (!inputRef.current) return;
          inputRef.current.focus();
        }}
        className={cn(
          "flex flex-col gap-y-2.5 relative mb-2.5",
          inputWidth,
          bgColor,
          inputBorderRadius,
          inputLabelType === "inset"
            ? cn(containerPaddingTop ? "pb-5" : "pb-5 pt-[34px]", getInputStyle)
            : ""
        )}
        style={{
          height: containerHeight ? `${containerHeight}px` : "",
          paddingTop:
            inputLabelType === "inset"
              ? containerPaddingTop
                ? `${containerPaddingTop}px`
                : ""
              : "",
        }}
      >
        <InputLabelBase
          ref={inputLabelRef}
          label={label}
          labelWidth={inputLabelWidth}
          error={error}
          answered={disabled ? true : readOnly ? true : answered}
          focus={focus}
          required={required}
          htmlFor={id}
          type={inputLabelType}
          setFocus={setFocus}
          labelFontFamily={labelFontFamily}
          labelFontSize={labelFontSize}
          labelFontWeight={labelFontWeight}
          labelLineHeight={labelLineHeight}
          labelTextColor={labelTextColor}
          labelActivateStyle="top-5"
          labelDeActivateStyle="top-5"
          errorLabelFontFamily={errorLabelFontFamily}
          errorLabelFontSize={errorLabelFontSize}
          errorLabelFontWeight={errorLabelFontWeight}
          errorLabelLineHeight={errorLabelLineHeight}
          errorLabelTextColor={errorLabelTextColor}
        />
        <div className="flex relative">
          <textarea
            id={id}
            ref={inputRef}
            value={value ? value : undefined}
            className={cn(
              "flex px-5 min-h-[100px] resize-none",
              inputWidth,
              inputHeight,
              inputFontSize,
              inputFontWeight,
              inputLineHeight,
              bgColor,
              placeholderFontFamily,
              placeholderFontSize,
              placeholderFontWeight,
              placeholderLineHeight,
              placeholderTextColor,
              disabled
                ? cn(disabledCursor, "text-instillGrey50")
                : readOnly
                ? cn(readOnlyCursor, "text-instillGrey50")
                : inputTextColor,
              inputLabelType === "inset"
                ? "instill-input-no-highlight"
                : cn(getInputStyle, "pt-5")
            )}
            disabled={disabled}
            required={required}
            placeholder={focus ? placeholder : undefined}
            readOnly={readOnly}
            autoComplete={autoComplete}
            onChange={(event) => {
              const inputValue = event.target.value;
              onChangeInput(id, event.target.value);
              if (!inputValue) {
                setAnswered(false);
                return;
              }
              setAnswered(true);
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          {enableCounter ? (
            <div
              className={cn(
                counterFontSize,
                counterFontWeight,
                counterFontFamily,
                counterLineHeight,
                counterTextColor,
                "absolute right-4 bottom-2"
              )}
            >{`${value ? value.length : 0}/${counterWordLimit}`}</div>
          ) : null}
        </div>
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

export default TextAreaBase;
