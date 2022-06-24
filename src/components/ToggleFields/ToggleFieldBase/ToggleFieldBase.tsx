import React from "react";
import cn from "clsx";
import {
  BasicInputFieldAttributes,
  Nullable,
  State,
} from "../../../types/general";
import InputLabelBase from "../../InputLabels/InputLabelBase";
import InputDescriptionBase from "../../InputDescriptions/InputDescriptionBase";

export type ToggleFieldBaseProps = Omit<
  BasicInputFieldAttributes,
  | "placeholder"
  | "inputFontSize"
  | "inputLineHeight"
  | "inputFontWeight"
  | "inputTextColor"
  | "inputWidth"
  | "inputHeight"
  | "autoComplete"
  | "inputLabelType"
  | "bgColor"
  | "disabledInputTextColor"
  | "readOnlyInputTextColor"
  | "placeholderFontFamily"
  | "placeholderFontSize"
  | "placeholderFontWeight"
  | "placeholderLineHeight"
  | "placeholderTextColor"
  | "errorInputBgColor"
  | "errorInputBorderColor"
  | "errorInputBorderStyle"
  | "errorInputBorderWidth"
  | "errorInputTextColor"
> & {
  /** The initial checked state of this toggle field */
  defaultChecked: boolean;

  /** TailwindCSS format - Toggle center's dot color
   * - Please use background-color, e.g. bg-blqck
   */

  dotColor: string;

  /** TailwindCSS format - Toggle center's dot color when checked
   * - e.g. bg-black
   */
  checkedDotColor: string;

  /** TailwindCSS format - Toggle border color when checked
   * - e.g. border-black
   */
  checkedInputBorderColor: string;

  /** TailwindCSS format - Toggle input border color when checked and disabled
   * - e.g. border-black
   */
  disabledCheckedInputBorderColor: string;

  /** TailwindCSS format - Toggle center's dot color when disabled
   * - e.g. bg-black
   */
  disabledDotColor: string;

  /** TailwindCSS format - Toggle center's dot color when checked and disabled
   * - e.g. bg-black
   */
  disabledCheckedDotColor: string;

  /** TailwindCSS format - Toggle center's dot color when read-only
   * - e.g. bg-black
   */
  readOnlyDotColor: string;

  /** TailwindCSS format - Toggle center's dot color when checked and read-only
   * - e.g. bg-black
   */

  readOnlyCheckedDotColor: string;

  /** TailwindCSS format - Toggle input border color when checked and read-only
   * - e.g. border-black
   */

  readOnlyCheckedInputBorderColor: string;

  value: boolean;

  /** TailwindCSS format - Toggle input border color when focus
   * - e.g. border-black
   */

  inputFocusBorderColor: string;

  /** TailwindCSS utility string - setup this custom style at instill plugin and use it
   * - e.g. instill-input-shadow
   * - When shadow string is not null, input field will show the shadow, if you want to display
   *   shadow only when user focus on the input, please use inputFocusShadow
   */
  inputShadow: Nullable<string>;

  /** TailwindCSS utility string - setup this custom style at instill plugin and use it
   * - e.g. instill-input-focus-shadow
   * - Show the shadow when user focus on input
   */
  inputFocusShadow: string;
};

const ToggleFieldBase: React.FC<ToggleFieldBaseProps> = ({
  id,
  value,
  label,
  additionalMessageOnLabel,
  description,
  defaultChecked,
  disabled,
  readOnly,
  focusHighlight,
  required,
  onChangeInput,
  inputBorderRadius,
  inputBorderColor,
  inputBorderStyle,
  inputBorderWidth,
  inputBgColor,
  inputShadow,
  inputFocusBorderColor,
  inputFocusShadow,
  dotColor,
  checkedDotColor,
  checkedInputBorderColor,
  disabledCursor,
  disabledInputBgColor,
  disabledInputBorderColor,
  disabledInputBorderStyle,
  disabledInputBorderWidth,
  disabledCheckedInputBorderColor,
  disabledDotColor,
  disabledCheckedDotColor,
  readOnlyCursor,
  readOnlyInputBgColor,
  readOnlyInputBorderColor,
  readOnlyInputBorderStyle,
  readOnlyInputBorderWidth,
  readOnlyDotColor,
  readOnlyCheckedInputBorderColor,
  readOnlyCheckedDotColor,
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
  error,
  errorLabelFontFamily,
  errorLabelFontSize,
  errorLabelFontWeight,
  errorLabelLineHeight,
  errorLabelTextColor,
}) => {
  const [answered, setAnswered] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  return (
    <div className="flex flex-col">
      <div className={cn("flex flex-col gap-y-2.5", { "mb-2.5": description })}>
        <InputLabelBase
          answered={answered}
          message={additionalMessageOnLabel}
          required={required}
          htmlFor={`${id}-label`}
          type="normal"
          label={label}
          labelFontFamily={labelFontFamily}
          labelFontSize={labelFontSize}
          labelFontWeight={labelFontWeight}
          labelLineHeight={labelLineHeight}
          labelTextColor={labelTextColor}
          labelActivateStyle={labelActivateStyle}
          labelDeActivateStyle={labelDeActivateStyle}
          error={error}
          errorLabelFontFamily={errorLabelFontFamily}
          errorLabelFontSize={errorLabelFontSize}
          errorLabelFontWeight={errorLabelFontWeight}
          errorLabelLineHeight={errorLabelLineHeight}
          errorLabelTextColor={errorLabelTextColor}
          labelWidth={null}
        />
        <label
          htmlFor={id}
          className={cn("flex relative w-[90px] h-10", inputBgColor)}
        >
          <input
            id={id}
            aria-label={`${id}-label`}
            className={cn(
              "peer appearance-none w-[90px] h-10",
              inputBorderRadius,
              inputShadow,
              disabled
                ? "cursor-not-allowed"
                : readOnly
                ? "cursor-not-allowed"
                : "cursor-pointer",
              disabled
                ? cn(
                    disabledCursor,
                    disabledInputBgColor,
                    disabledInputBorderStyle,
                    disabledInputBorderWidth,
                    value
                      ? disabledCheckedInputBorderColor
                      : disabledInputBorderColor
                  )
                : readOnly
                ? cn(
                    readOnlyCursor,
                    readOnlyInputBgColor,
                    readOnlyInputBorderStyle,
                    readOnlyInputBorderWidth,
                    value
                      ? readOnlyCheckedInputBorderColor
                      : readOnlyInputBorderColor
                  )
                : focusHighlight
                ? focus
                  ? cn(
                      inputBorderWidth,
                      inputBorderStyle,
                      inputFocusBorderColor,
                      inputFocusShadow
                    )
                  : cn(
                      inputBorderStyle,
                      value ? checkedInputBorderColor : inputBorderColor,
                      inputBorderWidth
                    )
                : cn(inputBorderColor, inputBorderStyle, inputBorderWidth)
            )}
            checked={value}
            type="checkbox"
            role="switch"
            disabled={disabled}
            readOnly={readOnly}
            onChange={(event) => {
              if (readOnly) {
                return;
              }

              onChangeInput(id, event.target.checked);

              if (!answered) {
                setAnswered(true);
              }
            }}
            onClick={(event) => {
              if (readOnly) {
                event.stopPropagation();
                event.preventDefault();
                return false;
              }
            }}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            defaultChecked={defaultChecked}
          />
          <div
            className={cn(
              "absolute left-[5px] top-[5px] w-[30px] h-[30px] origin-top-left transition peer-checked:translate-x-[50px]",
              disabled
                ? cn(
                    value ? disabledCheckedDotColor : disabledDotColor,
                    "cursor-not-allowed"
                  )
                : readOnly
                ? cn(
                    value ? readOnlyCheckedDotColor : readOnlyDotColor,
                    "cursor-auto"
                  )
                : cn(checkedDotColor, "cursor-pointer"),
              value ? checkedDotColor : dotColor,
              inputBorderRadius
            )}
          />
        </label>
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

export default ToggleFieldBase;
