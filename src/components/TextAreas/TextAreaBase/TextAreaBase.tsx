import { FC, useState } from "react";
import cn from "clsx";
import { BasicInputFieldAttributes } from "../../../types/general";
import { TextAreaInputLabel } from "../../InputLabels";

export interface TextAreaBaseProps extends BasicInputFieldAttributes {
  /** Control how textarea can be resized*/
  resize: "both" | "none" | "x" | "y";
}

const TextAreaBase: FC<TextAreaBaseProps> = ({
  onChangeInput,
  id,
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
  resize,
  inputLabelType,
  inputBorderRadius,
  inputBorderColor,
  inputBorderStyle,
  inputBorderWidth,
}) => {
  const [focus, setFocus] = useState(false);
  const [answered, setAnswered] = useState(false);

  const widthStyle = inputWidth ?? "w-full";
  const heightStyle = inputHeight ?? "h-[70px]";

  let resizeStyle: string;

  switch (resize) {
    case "both":
      resizeStyle = "resize";
      break;
    case "none":
      resizeStyle = "resize-none";
      break;
    case "x":
      resizeStyle = "resize-x";
      break;
    case "y":
      resizeStyle = "resize-y";
      break;
  }

  return (
    <div className={cn("flex flex-col gap-y-2.5 relative", widthStyle)}>
      <TextAreaInputLabel
        answered={disabled ? true : readOnly ? true : answered}
        focus={focus}
        required={required}
        htmlFor={id}
        type={inputLabelType}
      >
        {labelName}
      </TextAreaInputLabel>
      <textarea
        className={cn(
          "px-5 pb-5 pl-5 min-h-[140px]",
          inputLabelType === "inset" ? "pt-[34px]" : "pt-5",
          heightStyle,
          widthStyle,
          inputFontSize,
          inputFontWeight,
          inputLineHeight,
          resizeStyle,
          bgColor,
          disabledCursor,
          disabledInputBgColor,
          disabledInputBorderColor,
          disabledInputBorderStyle,
          disabledInputBorderWidth,
          disabledInputTextColor,
          readOnlyCursor,
          readOnlyInputBgColor,
          readOnlyInputBorderColor,
          readOnlyInputBorderStyle,
          readOnlyInputBorderWidth,
          readOnlyInputTextColor,
          inputBorderRadius,
          placeholderFontFamily,
          placeholderFontSize,
          placeholderFontWeight,
          placeholderLineHeight,
          placeholderTextColor,
          disabled
            ? "text-instillGray50"
            : readOnly
            ? "text-instillGray50"
            : inputTextColor,
          disabled
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
      />
    </div>
  );
};

export default TextAreaBase;
