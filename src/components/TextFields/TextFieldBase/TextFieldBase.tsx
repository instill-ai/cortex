import { FC, useState } from "react";
import cn from "clsx";
import EyeOffIcon from "../../Icons/EyeOffIcon";
import EyeOnIcon from "../../Icons/EyeOnIcon";
import { BasicInputFieldAttributes } from "../../../types/general";
import { BasicInputLabel } from "../../InputLabels";

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
  inputBorderRadius,
  inputBorderColor,
  inputBorderStyle,
  inputBorderWidth,
}) => {
  const [focus, setFocus] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const widthStyle = inputWidth ?? "w-full";
  const heightStyle = inputHeight ?? "h-[70px]";

  return (
    <div className={cn("flex flex-col gap-y-2.5 relative", widthStyle)}>
      <BasicInputLabel
        answered={disabled ? true : readOnly ? true : answered}
        focus={focus}
        required={required}
        htmlFor={id}
        type={inputLabelType}
        onBlurHandler={(event) => {
          console.log(event);
          setFocus(false);
        }}
        onFocusHandler={(event) => {
          setFocus(true);
        }}
      >
        {labelName}
      </BasicInputLabel>
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
                ),

            disabled
              ? "text-instillGray50"
              : readOnly
              ? "text-instillGray50"
              : inputTextColor,
            inputBorderRadius
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
