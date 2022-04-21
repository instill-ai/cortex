import React from "react";
import cn from "clsx";

export interface InputLabelBaseProps {
  /** Input label's type
   * - normal: input label has normal position layout and doesn't have any animation
   * - inset: input label has absolution position layout, put into the input field and have float up animation with specific activate, deActivate style
   */
  type: "normal" | "inset" | "hide";

  /**
   * Input label's text
   */
  label: string;

  /** Input label associated input field's id */
  htmlFor: string;

  /** TailwindCSS format - Label's text color
   * - e.g. text-instillGrey50
   */
  labelTextColor: string;

  /** TailwindCSS format - Label's font weight
   * - e.g. font-normal
   */
  labelFontWeight: string;

  /** TailwindCSS format - Label's font size
   * - e.g. text-base
   */
  labelFontSize: string;

  /** TailwindCSS format - Label's font family
   * - e.g. font-sans
   */
  labelFontFamily: string;

  /** TailwindCSS format - Label's line height
   * - e.g. leading-normal
   */
  labelLineHeight: string;

  /** Whether the input is required or not */
  required: boolean;

  /** Whether the input is focused or not */
  focus?: boolean;

  /** Whether the input is answered or not */
  answered: boolean;

  /** TailwindCSS format
   * - Activate mean whether the input is being focused or the input field was answered
   * - Don't need to specific translate-x-, it's fixed value
   */
  labelActivateStyle?: string;

  /** TailwindCSS format
   * - Activate mean whether the input is being focused or the input field was answered
   * - Don't need to specific translate-x-, it's fixed value
   */
  labelDeActivateStyle?: string;

  /** Handle input label focus event */
  onFocusHandler?: (event) => void;

  /** Handle input label blud event */
  onBlurHandler?: (event) => void;
}

const InputLabelBase: React.FC<InputLabelBaseProps> = React.memo(
  ({
    htmlFor,
    required,
    focus,
    answered,
    label,
    labelFontSize,
    labelFontWeight,
    labelTextColor,
    labelFontFamily,
    labelActivateStyle,
    labelDeActivateStyle,
    onFocusHandler,
    onBlurHandler,
    type,
  }) => {
    let activate = false;

    if (focus) {
      activate = true;
    } else {
      activate = answered ? true : false;
    }

    return (
      <>
        {type !== "hide" ? (
          <label
            className={cn(
              "z-10 flex",
              type === "inset"
                ? activate
                  ? labelActivateStyle
                  : labelDeActivateStyle
                : "",
              labelFontSize,
              labelFontWeight,
              labelTextColor,
              labelFontFamily,
              {
                "absolute translate-x-5 transform-gpu origin-top-left left-0":
                  type === "inset",
              }
            )}
            htmlFor={htmlFor}
            onFocus={(event) => onFocusHandler(event)}
            onBlur={(event) => onBlurHandler(event)}
          >
            {label}
            {required ? <span className="ml-1">*</span> : null}
          </label>
        ) : (
          ""
        )}
      </>
    );
  }
);

export default InputLabelBase;

InputLabelBase.displayName = "InputLabelBase";
