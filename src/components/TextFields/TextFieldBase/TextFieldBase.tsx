import React from "react";
import cn from "clsx";
import EyeOffIcon from "../../Icons/EyeOffIcon";
import EyeOnIcon from "../../Icons/EyeOnIcon";
import { BasicInputFieldAttributes, Nullable } from "../../../types/general";
import InputLabelBase from "../../InputLabels/InputLabelBase";
import InputDescriptionBase from "../../InputDescriptions/InputDescriptionBase";
import { getElementPosition, getTailwindClassNumber } from "../../../utils";

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

  value: Nullable<string>;
}

const TextFieldBase: React.FC<TextFieldBaseProps> = ({
  onChangeInput,
  id,
  required,
  value,
  error,
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
  label,
  description,
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
  descriptionFontFamily,
  descriptionFontSize,
  descriptionFontWeight,
  descriptionLineHeight,
  descriptionTextColor,
}) => {
  const [focus, setFocus] = React.useState(false);
  const [answered, setAnswered] = React.useState(false);
  const [showSecret, setShowSecret] = React.useState(false);
  const [inputLabelWidth, setInputLabelWidth] =
    React.useState<Nullable<number>>(null);
  const [containerHeight, setContainerHeight] =
    React.useState<Nullable<number>>(null);
  const [inputValuePaddingTop, setInputValuePaddingTop] =
    React.useState<Nullable<number>>(null);

  // If defaultValue is present, set focus
  React.useEffect(() => {
    if (value) {
      setAnswered(true);
    }
  }, [value]);

  /**
   * We use these ref to calculate the width and height of the container
   * when there has very long error message which make label overflow.
   * - When component is mount we calculate the label width
   * - When error prop is changed we calculate the container height and compare it with original
   *   container height, is former is greater, we adapt new container height
   * - We use inputValuePaddingTop to control the position of the input value
   */

  const inputRef = React.useRef<HTMLInputElement>(null);
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
      !error ||
      !inputRef ||
      !inputLabelRef.current ||
      !inputRef.current ||
      !inputLabelRef ||
      inputLabelType !== "inset"
    ) {
      setContainerHeight(getTailwindClassNumber(inputHeight));
      setInputValuePaddingTop(0);
      return;
    }

    const inputLabelPosition = getElementPosition(inputLabelRef.current);
    const mainContainerPosition = getElementPosition(inputRef.current);

    const inputLabelPaddingY = 20;
    const gapBetweenLabelAndValue = 10;

    const inputLabelHeight =
      inputLabelPosition.height +
      inputLabelPaddingY * 2 +
      getTailwindClassNumber(inputLineHeight) +
      gapBetweenLabelAndValue;

    if (inputLabelHeight > mainContainerPosition.height) {
      setContainerHeight(inputLabelHeight);
      setInputValuePaddingTop(
        inputLabelPosition.height + inputLabelPaddingY + gapBetweenLabelAndValue
      );
    } else {
      setContainerHeight(getTailwindClassNumber(inputHeight));
      setInputValuePaddingTop(0);
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
        className={cn(
          "flex flex-col gap-y-2.5 relative mb-2.5",
          inputWidth,
          inputBorderRadius,
          inputLabelType === "inset" ? getInputStyle : ""
        )}
      >
        <InputLabelBase
          ref={inputLabelRef}
          error={error}
          answered={disabled ? true : readOnly ? true : answered}
          focus={focus}
          setFocus={setFocus}
          required={required}
          htmlFor={id}
          type={inputLabelType}
          label={label}
          labelWidth={inputLabelWidth}
          labelFontFamily={labelFontFamily}
          labelFontSize={labelFontSize}
          labelFontWeight={labelFontWeight}
          labelLineHeight={labelLineHeight}
          labelTextColor={labelTextColor}
          labelActivateStyle={labelActivateStyle}
          labelDeActivateStyle={labelDeActivateStyle}
          errorLabelFontFamily={errorLabelFontFamily}
          errorLabelFontSize={errorLabelFontSize}
          errorLabelFontWeight={errorLabelFontWeight}
          errorLabelLineHeight={errorLabelLineHeight}
          errorLabelTextColor={errorLabelTextColor}
        />
        <div className="flex relative">
          <input
            value={value ? value : undefined}
            style={{
              height: containerHeight ? `${containerHeight}px` : "",
              paddingTop: inputValuePaddingTop
                ? `${inputValuePaddingTop}px`
                : "",
            }}
            ref={inputRef}
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
              disabled
                ? undefined
                : readOnly
                ? undefined
                : focus
                ? placeholder
                : undefined
            }
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

export default TextFieldBase;
