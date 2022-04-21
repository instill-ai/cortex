import React from "react";
import cn from "clsx";
import { BasicInputFieldAttributes } from "../../../types/general";
import InputLabelBase from "../../InputLabels/InputLabelBase";
import InputDescriptionBase from "../../InputDescriptions/InputDescriptionBase";

export interface TextAreaBaseProps extends BasicInputFieldAttributes {
  /** Textarea value */
  value: string;

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
}

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
  labelActivateStyle,
  labelDeActivateStyle,
  descriptionFontFamily,
  descriptionFontSize,
  descriptionFontWeight,
  descriptionLineHeight,
  descriptionTextColor,
}) => {
  const [focus, setFocus] = React.useState(false);
  const [answered, setAnswered] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

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

  const getInputStyle = disabled
    ? cn(
        disabledCursor,
        disabledInputBgColor,
        disabledInputBorderColor,
        disabledInputBorderStyle,
        disabledInputBorderWidth,
        disabledInputTextColor
      )
    : readOnly
    ? cn(
        readOnlyCursor,
        readOnlyInputBgColor,
        readOnlyInputBorderColor,
        readOnlyInputBorderStyle,
        readOnlyInputBorderWidth,
        readOnlyInputTextColor
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
          inputRef.current.focus();
        }}
        className={cn(
          "flex flex-col gap-y-2.5 relative mb-2.5",
          inputWidth,
          bgColor,
          inputBorderRadius,
          inputLabelType === "inset" ? cn("pb-5 pt-[34px]", getInputStyle) : ""
        )}
      >
        <InputLabelBase
          label={label}
          answered={disabled ? true : readOnly ? true : answered}
          focus={focus}
          required={required}
          htmlFor={id}
          type={inputLabelType}
          onFocusHandler={() => {
            setFocus(true);
          }}
          onBlurHandler={() => {
            setFocus(false);
          }}
          labelFontFamily={labelFontFamily}
          labelFontSize={labelFontSize}
          labelFontWeight={labelFontWeight}
          labelLineHeight={labelLineHeight}
          labelTextColor={labelTextColor}
          labelActivateStyle={labelActivateStyle}
          labelDeActivateStyle={labelDeActivateStyle}
        />
        <textarea
          ref={inputRef}
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
          id={id}
          disabled={disabled}
          required={required}
          placeholder={focus ? placeholder : null}
          readOnly={readOnly}
          autoComplete={autoComplete}
          onChange={(event) => {
            const inputValue = event.target.value;
            onChangeInput(event.target.value);
            if (!inputValue) {
              setAnswered(false);
              return;
            }
            setAnswered(true);
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
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
