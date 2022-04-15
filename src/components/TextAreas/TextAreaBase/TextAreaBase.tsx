import { FC, useRef, useState } from "react";
import cn from "clsx";
import { BasicInputFieldAttributes } from "../../../types/general";
import { TextAreaInputLabel } from "../../InputLabels";

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
   * - e.g. text-instillGray50
   * - https://tailwindcss.com/docs/text-color
   */
  counterTextColor: string;

  /** TailwindCSS format - Line height of textarea's counter
   * - e.g. leading-normal
   * - https://tailwindcss.com/docs/line-height
   */
  counterLineHeight: string;
}

const TextAreaBase: FC<TextAreaBaseProps> = ({
  id,
  value,
  onChangeInput,
  required,
  error,
  labelName,
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
}) => {
  const [focus, setFocus] = useState(false);
  const [answered, setAnswered] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const widthStyle = inputWidth ?? "w-full";
  const heightStyle = inputHeight ?? "h-[70px]";

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

  return (
    <div
      onClick={() => {
        inputRef.current.focus();
      }}
      className={cn(
        "px-5 pb-5 pl-5 flex flex-col gap-y-2.5 relative",
        widthStyle,
        bgColor,
        inputBorderRadius,
        inputLabelType === "inset" ? "pt-[34px]" : "pt-5",
        disabled
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
                "foutline-none ring-0 ring-white border-instillBlue50 instill-input-focus-shadow cursor-text"
              )
            : cn(
                inputBorderColor,
                inputBorderStyle,
                inputBorderWidth,
                "cursor-text"
              )
          : cn(
              inputBorderColor,
              inputBorderStyle,
              inputBorderWidth,
              "cursor-text"
            )
      )}
    >
      <TextAreaInputLabel
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
      >
        {labelName}
      </TextAreaInputLabel>
      <textarea
        ref={inputRef}
        className={cn(
          "instill-input-no-highlight h-full resize-none",
          inputWidth,
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
            ? cn(disabledCursor, "text-instillGray50")
            : readOnly
            ? cn(readOnlyCursor, "text-instillGray50")
            : inputTextColor
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
  );
};

export default TextAreaBase;
