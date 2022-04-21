import React from "react";
import cn from "clsx";
import { BasicInputFieldAttributes } from "../../../types/general";
import InputLabelBase from "../../InputLabels/InputLabelBase";
import InputDescriptionBase from "../../InputDescriptions/InputDescriptionBase";

export type ToggleFieldBaseProps = Omit<
  BasicInputFieldAttributes,
  | "error"
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
};

const ToggleFieldBase: React.FC<ToggleFieldBaseProps> = ({
  id,
  label,
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
}) => {
  const [answered, setAnswered] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-2.5 mb-2.5">
        <InputLabelBase
          answered={disabled ? true : readOnly ? true : answered}
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
        />
        <label htmlFor={id} className="flex relative w-[90px] h-10">
          <input
            id={id}
            aria-label={`${id}-label`}
            className={cn(
              "peer appearance-none w-[90px] h-10",
              inputBorderRadius,
              disabled
                ? cn(
                    disabledCursor,
                    disabledInputBgColor,
                    disabledInputBorderStyle,
                    disabledInputBorderWidth,
                    checked
                      ? disabledCheckedInputBorderColor
                      : disabledInputBorderColor
                  )
                : readOnly
                ? cn(
                    readOnlyCursor,
                    readOnlyInputBgColor,
                    readOnlyInputBorderStyle,
                    readOnlyInputBorderWidth,
                    checked
                      ? readOnlyCheckedInputBorderColor
                      : readOnlyInputBorderColor
                  )
                : focusHighlight
                ? focus
                  ? cn(
                      inputBorderWidth,
                      inputBorderStyle,
                      "outline-none ring-0 ring-white border-instillBlue50 instill-input-focus-shadow cursor-pointer"
                    )
                  : cn(
                      inputBorderStyle,
                      checked ? checkedInputBorderColor : inputBorderColor,
                      inputBorderWidth,
                      "cursor-pointer"
                    )
                : cn(
                    inputBorderColor,
                    inputBorderStyle,
                    inputBorderWidth,
                    "cursor-pointer"
                  )
            )}
            type="checkbox"
            role="switch"
            disabled={disabled}
            readOnly={readOnly}
            onChange={(event) => {
              if (readOnly) {
                return;
              }

              onChangeInput(event.target.checked);
              setChecked(event.target.checked);

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
                    checked ? disabledCheckedDotColor : disabledDotColor,
                    "cursor-not-allowed"
                  )
                : readOnly
                ? cn(
                    checked ? readOnlyCheckedDotColor : readOnlyDotColor,
                    "cursor-auto"
                  )
                : cn(checkedDotColor, "cursor-pointer"),
              checked ? checkedDotColor : dotColor,
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
