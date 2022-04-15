import { FC, useState } from "react";
import cn from "clsx";
import { BasicInputFieldAttributes } from "../../../types/general";
import { BasicInputLabel } from "../../InputLabels";

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
   * - We have peer on input, please use tailwindCSS persudo class "peer-checked:"
   * - e.g. peer-checked:bg-black
   */
  checkedDotColor: string;

  /** TailwindCSS format - Toggle border color when checked
   * - Please use tailwindCSS persudo class "checked:"
   * - e.g. checked:border-black
   */
  checkedInputBorderColor: string;

  /** TailwindCSS format - Toggle input border color when checked and disabled
   * - Please use tailwindCSS persudo class "disabled:checked:"
   * - e.g. disabled:checked:border-black
   */
  disabledCheckedInputBorderColor: string;

  /** TailwindCSS format - Toggle center's dot color when disabled
   * - Please use tailwindCSS persudo class "disabled:"
   * - e.g. disabled:bg-black
   */
  disabledDotColor: string;

  /** TailwindCSS format - Toggle center's dot color when checked and disabled
   * - We have peer on input, please use tailwindCSS persudo class "disabled:peer-checked:"
   * - e.g. disabled:peer-checked:bg-black
   */
  disabledCheckedDotColor: string;

  /** TailwindCSS format - Toggle center's dot color when read-only
   * - We have peer on input, please use tailwindCSS persudo class "read-only:"
   * - e.g. read-only:bg-black
   */
  readOnlyDotColor: string;

  /** TailwindCSS format - Toggle center's dot color when checked and read-only
   * - We have peer on input, please use tailwindCSS persudo class "read-only:peer-checked:"
   * - e.g. read-only:peer-checked:bg-black
   */

  readOnlyCheckedDotColor: string;

  /** TailwindCSS format - Toggle input border color when checked and read-only
   * - Please use tailwindCSS persudo class "read-only:checked:"
   * - e.g. read-only:checked:border-black
   */

  readOnlyCheckedInputBorderColor: string;
};

const ToggleFieldBase: FC<ToggleFieldBaseProps> = ({
  inputBorderRadius,
  inputBorderColor,
  inputBorderStyle,
  inputBorderWidth,
  id,
  defaultChecked,
  disabled,
  readOnly,
  focusHighlight,
  required,
  onChangeInput,
  labelName,
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
}) => {
  const [answered, setAnswered] = useState(false);
  const [focus, setFocus] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-y-2.5">
      <BasicInputLabel
        answered={disabled ? true : readOnly ? true : answered}
        required={required}
        htmlFor={`${id}-label`}
        type="normal"
      >
        {labelName}
      </BasicInputLabel>
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
                  disabledInputBorderColor,
                  disabledInputBorderStyle,
                  disabledInputBorderWidth,
                  disabledCheckedInputBorderColor
                )
              : readOnly
              ? cn(
                  readOnlyCursor,
                  readOnlyInputBgColor,
                  readOnlyInputBorderColor,
                  readOnlyInputBorderStyle,
                  readOnlyInputBorderWidth,
                  readOnlyCheckedInputBorderColor
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
                  disabledDotColor,
                  disabledCheckedDotColor,
                  "cursor-not-allowed"
                )
              : readOnly
              ? cn(readOnlyDotColor, readOnlyCheckedDotColor, "cursor-auto")
              : cn(checkedDotColor, "cursor-pointer"),
            dotColor,
            inputBorderRadius
          )}
        />
      </label>
    </div>
  );
};

export default ToggleFieldBase;
