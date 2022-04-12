import { FC, useState } from "react";
import cn from "clsx";
import InputLabel from "../../InputLabel";
import { BasicInputFieldAttributes } from "../../../types/general";

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
  resize,
  inputLabelType,
  borderRadius,
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
    <div
      className={cn(
        "flex flex-col gap-y-2.5 relative",
        widthStyle,
        borderRadius
      )}
    >
      <InputLabel
        answered={disabled ? true : readOnly ? true : answered}
        focus={focus}
        required={required}
        htmlFor={id}
        fontStyle="font-normal text-sm leading-[18.2px]"
        activateStyle="top-0 translate-y-3"
        deActivateStyle="top-0 translate-y-[26px]"
        type={inputLabelType}
      >
        {labelName}
      </InputLabel>
      <textarea
        className={cn(
          "px-5 pb-5 pl-5 placeholder:text-instillGray30 min-h-[140px]",
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
          borderRadius,
          disabled
            ? "instill-input-no-highlight border border-instillGray15"
            : readOnly
            ? "instill-input-no-highlight border border-instillGray15"
            : focusHighlight
            ? "instill-input-highlight"
            : "instill-input-no-highlight border border-instillGray15",
          disabled
            ? "text-instillGray50"
            : readOnly
            ? "text-instillGray50"
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
      />
    </div>
  );
};

export default TextAreaBase;
