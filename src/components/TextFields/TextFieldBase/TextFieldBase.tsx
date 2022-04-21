import React from "react";
import cn from "clsx";
import EyeOffIcon from "../../Icons/EyeOffIcon";
import EyeOnIcon from "../../Icons/EyeOnIcon";
import { BasicInputFieldAttributes } from "../../../types/general";
import InputLabelBase from "../../InputLabels/InputLabelBase";

//  TextFieldBase
//
//  ### How we implement inset lable transfor
//  - Use top-1/2 + (-translate-y-1/2) to make label fix at the center of input box
//  - Use top-1/2 + (-translate-y-full) to move label up a little bit
//  - If you want to change the InputLabel font size, you have to change the input's paddingTop and Input paddingTop

export interface TextFieldBaseProps extends BasicInputFieldAttributes {
  /** Text field's type
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
   */
  type: string;

  /** Whether enable protected text toggle or not */
  enableProtectedToggle: boolean;
}

const TextFieldBase: React.FC<TextFieldBaseProps> = ({
  onChangeInput,
  id,
  required,
  error,
  label,
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
  placeholderFontFamily,
  placeholderFontSize,
  placeholderFontWeight,
  placeholderLineHeight,
  placeholderTextColor,
  enableProtectedToggle,
  inputLabelType,
  inputBorderRadius,
  inputBorderColor,
  inputBorderStyle,
  inputBorderWidth,
  labelFontFamily,
  labelFontSize,
  labelFontWeight,
  labelLineHeight,
  labelTextColor,
  labelActivateStyle,
  labelDeActivateStyle,
}) => {
  const [focus, setFocus] = React.useState(false);
  const [answered, setAnswered] = React.useState(false);
  const [showSecret, setShowSecret] = React.useState(false);

  const getInputStyle = disabled
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
    <div
      className={cn(
        "flex flex-col gap-y-2.5 relative",
        inputWidth,
        inputBorderRadius,
        inputLabelType === "inset" ? getInputStyle : ""
      )}
    >
      <InputLabelBase
        answered={disabled ? true : readOnly ? true : answered}
        focus={focus}
        required={required}
        htmlFor={id}
        type={inputLabelType}
        onBlurHandler={() => {
          setFocus(false);
        }}
        onFocusHandler={() => {
          setFocus(true);
        }}
        label={label}
        labelFontFamily={labelFontFamily}
        labelFontSize={labelFontSize}
        labelFontWeight={labelFontWeight}
        labelLineHeight={labelLineHeight}
        labelTextColor={labelTextColor}
        labelActivateStyle={labelActivateStyle}
        labelDeActivateStyle={labelDeActivateStyle}
      />
      <div className="flex relative">
        <input
          className={cn(
            "pl-5",
            inputLabelType === "inset"
              ? "pt-6 instill-input-no-highlight"
              : getInputStyle,
            inputHeight,
            inputWidth,
            inputFontSize,
            inputLineHeight,
            inputFontWeight,
            bgColor,
            inputBorderRadius,
            placeholderFontFamily,
            placeholderFontSize,
            placeholderFontWeight,
            placeholderLineHeight,
            placeholderTextColor,
            disabled
              ? cn(disabledCursor, "text-instillGrey50")
              : readOnly
              ? cn(readOnlyCursor, "text-instillGrey50")
              : inputTextColor
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
                  width="w-6"
                  height="h-6"
                  color="text-instillGrey50"
                  position="my-auto"
                />
              ) : (
                <EyeOnIcon
                  width="w-6"
                  height="h-6"
                  color="text-instillGrey50"
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
