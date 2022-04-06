import { FC, useRef, useState } from "react";
import cn from "clsx";
import InputLabel from "../../InputLabel";
import EyeSlashIcon from "../../Icons/EyeSlashIcon";
import EyeIcon from "../../Icons/EyeIcon";
import { BasicInputFieldAttributes } from "../../../types/general";

export interface TextFieldBaseProps extends BasicInputFieldAttributes {
  /** Text field's type
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
   */
  type: string;

  /** Whether enable protected text toggle or not */
  enableProtectedToggle: boolean;
}

/**
 * TextFieldBase
 *
 * ### How it implement inset lable transfor
 * - Use top-1/2 + (-translate-y-1/2) to make label fix at the center of input box
 * - Use top-1/2 + (-translate-y-full) to move label up a little bit
 */

const TextFieldBase: FC<TextFieldBaseProps> = ({
  onChangeInput,
  id,
  required,
  valid,
  labelName,
  fontSize,
  lineHeight,
  fontWeight,
  textColor,
  bgColor,
  disabledBgColor,
  readOnlyBgColor,
  inputWidth,
  inputHeight,
  autoComplete,
  focusHighlight,
  disabled,
  type,
  placeholder,
  readOnly,
  enableProtectedToggle,
}) => {
  const [focus, setFocus] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [expose, setExpose] = useState(false);

  const widthStyle = inputWidth ?? "w-full";
  const heightStyle = inputHeight ?? "h-[70px]";

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
        activateStyle="top-1/2 -translate-y-[120%]"
        deActivateStyle="top-1/2 -translate-y-1/2"
      >
        {labelName}
      </InputLabel>
      <input
        className={cn(
          "pt-6 ring-0 pl-5 placeholder:text-instillGray30",
          heightStyle,
          widthStyle,
          fontSize,
          lineHeight,
          fontWeight,
          readOnly ? readOnlyBgColor : bgColor,
          disabledBgColor,
          focusHighlight
            ? "instill-input-highlight"
            : "instill-input-no-highlight",
          disabled
            ? "text-instillGray50"
            : readOnly
            ? "text-instillGray50"
            : textColor
        )}
        id={id}
        type={expose ? "text" : type}
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
      {enableProtectedToggle ? (
        <div className="absolute flex transform-gpu right-5 top-1/2 -translate-y-1/2">
          <button className="my-auto" onClick={() => setExpose(!expose)}>
            {expose ? (
              <EyeSlashIcon
                width="w-4"
                height="h-4"
                color="text-instillGray50"
                position="my-auto"
              />
            ) : (
              <EyeIcon
                width="w-4"
                height="h-4"
                color="text-instillGray50"
                position="my-auto"
              />
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TextFieldBase;
