import { FC, useState } from "react";
import cn from "clsx";
import InputLabel from "../../InputLabel";
import EyeOffIcon from "../../Icons/EyeOffIcon";
import EyeOnIcon from "../../Icons/EyeOnIcon";
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
 * ### How we implement inset lable transfor
 * - Use top-1/2 + (-translate-y-1/2) to make label fix at the center of input box
 * - Use top-1/2 + (-translate-y-full) to move label up a little bit
 * - If you want to change the InputLabel size, you have to change the input's paddingTop and Input paddingTop
 */

const TextFieldBase: FC<TextFieldBaseProps> = ({
  onChangeInput,
  id,
  required,
  error,
  labelName,
  inputFontSize,
  inputFontWeight,
  inputLineHeight,
  inputTextColor,
  bgColor,
  disabled,
  disabledInputBgColor,
  disabledInputBorderStyle,
  disabledInputBorderColor,
  disabledInputBorderWidth,
  disabledInputTextColor,
  disabledCursor,
  readOnly,
  readOnlyInputBgColor,
  readOnlyInputBorderColor,
  readOnlyInputBorderStyle,
  readOnlyInputBorderWidth,
  readOnlyInputTextColor,
  readOnlyCursor,
  inputWidth,
  inputHeight,
  autoComplete,
  focusHighlight,
  type,
  placeholder,
  enableProtectedToggle,
  inputLabelType,
  borderRadius,
}) => {
  const [focus, setFocus] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const widthStyle = inputWidth ?? "w-full";
  const heightStyle = inputHeight ?? "h-[70px]";

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
        activateStyle="top-1/2 -translate-y-[120%]"
        deActivateStyle="top-1/2 -translate-y-1/2"
        type={inputLabelType}
      >
        {labelName}
      </InputLabel>
      <div className="flex relative">
        <input
          className={cn(
            "ring-0 pl-5 placeholder:text-instillGray30",
            inputLabelType === "inset" ? "pt-6" : "",
            heightStyle,
            widthStyle,
            inputFontSize,
            inputLineHeight,
            inputFontWeight,
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
              : inputTextColor,
            borderRadius
          )}
          id={id}
          type={showSecret ? "text" : type}
          disabled={disabled}
          required={required}
          placeholder={
            disabled ? null : readOnly ? null : focus ? placeholder : null
          }
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
            <button
              className="my-auto"
              onClick={() => setShowSecret(!showSecret)}
            >
              {showSecret ? (
                <EyeOffIcon
                  width="w-4"
                  height="h-4"
                  color="text-instillGray50"
                  position="my-auto"
                />
              ) : (
                <EyeOnIcon
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
    </div>
  );
};

export default TextFieldBase;
