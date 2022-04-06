import { FC, useState } from "react";
import cn from "clsx";
import InputLabel from "../../InputLabel";
import { BasicInputFieldAttributes } from "../../../types/general";

export interface TextAreaBaseProps extends BasicInputFieldAttributes {
  /** Control how  textarea can be resized*/
  resize: "both" | "none" | "x" | "y";
}

const TextAreaBase: FC<TextAreaBaseProps> = ({
  onChangeInput,
  id,
  required,
  valid,
  labelName,
  fontSize,
  textColor,
  fontWeight,
  lineHeight,
  bgColor,
  inputWidth,
  inputHeight,
  autoComplete,
  focusHighlight,
  disabled,
  disabledBgColor,
  placeholder,
  readOnly,
  readOnlyBgColor,
  resize,
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
        "flex relative border border-instillGray15 rounded-[1px]",
        widthStyle
      )}
    >
      <InputLabel
        answered={answered}
        focus={focus}
        required={required}
        htmlFor={id}
        fontStyle="font-normal text-sm leading-[18.2px]"
        activateStyle="top-0 translate-y-3"
        deActivateStyle="top-0 translate-y-[26px]"
      >
        {labelName}
      </InputLabel>
      <textarea
        className={cn(
          "mt-[34px] px-5 pb-5 ring-0 pl-5 placeholder:text-instillGray30 min-h-[140px]",
          heightStyle,
          widthStyle,
          fontSize,
          fontWeight,
          lineHeight,
          textColor,
          resizeStyle,
          readOnly ? readOnlyBgColor : bgColor,
          focusHighlight
            ? "instill-input-highlight"
            : "instill-input-no-highlight"
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
