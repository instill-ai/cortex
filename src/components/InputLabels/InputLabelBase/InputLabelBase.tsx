import React from "react";
import cn from "clsx";

export interface InputLabelBaseProps {
  /** Input label's type
   * - normal: input label has normal position layout and doesn't have any animation
   * - inset: input label has absolution position layout, put into the input field and have float up animation with specific activate, deActivate style
   */
  type: "normal" | "inset" | "hide";

  /**
   * Input's error string
   */
  error: string;

  /**
   * Input label's text
   */
  label: string;

  /** Input label associated input field's id */
  htmlFor: string;

  /** Whether the input is required or not */
  required: boolean;

  /** Whether the input is focused or not */
  focus?: boolean;

  /** Whether the input is answered or not */
  answered: boolean;

  /** Input label's width, calculated
   * - If the type is not inset, this field can be null and label will use w-full as default
   */
  labelWidth: number | null;

  /** Handle input label focus event */
  onFocusHandler?: (event) => void;

  /** Handle input label blud event */
  onBlurHandler?: (event) => void;

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

  /** TailwindCSS format - Label's text color when input has error
   * - e.g. text-instillGrey50
   */
  errorLabelTextColor: string;

  /** TailwindCSS format - Label's font weight when input has error
   * - e.g. font-normal
   */
  errorLabelFontWeight: string;

  /** TailwindCSS format - Label's font size when input has error
   * - e.g. text-base
   */
  errorLabelFontSize: string;

  /** TailwindCSS format - Label's font family when input has error
   * - e.g. font-sans
   */
  errorLabelFontFamily: string;

  /** TailwindCSS format - Label's line height when input has error
   * - e.g. leading-normal
   */
  errorLabelLineHeight: string;

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
}

export type InputLabelBaseRef = HTMLLabelElement;

const InputLabelBase = React.forwardRef<InputLabelBaseRef, InputLabelBaseProps>(
  (
    {
      htmlFor,
      required,
      focus,
      label,
      answered,
      labelFontSize,
      labelFontWeight,
      labelTextColor,
      labelFontFamily,
      labelLineHeight,
      labelActivateStyle,
      labelDeActivateStyle,
      onFocusHandler,
      onBlurHandler,
      type,
      error,
      errorLabelFontFamily,
      errorLabelFontSize,
      errorLabelFontWeight,
      errorLabelLineHeight,
      errorLabelTextColor,
      labelWidth,
    },
    ref
  ) => {
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
            ref={ref}
            className={cn(
              "z-10 flex flex-row",
              type === "inset"
                ? error
                  ? "top-5"
                  : activate
                  ? labelActivateStyle
                  : labelDeActivateStyle
                : "w-full",
              error
                ? cn(
                    errorLabelFontFamily,
                    errorLabelFontSize,
                    errorLabelFontWeight,
                    errorLabelLineHeight,
                    errorLabelTextColor
                  )
                : cn(
                    labelFontSize,
                    labelFontWeight,
                    labelTextColor,
                    labelFontFamily,
                    labelLineHeight
                  ),

              {
                "absolute translate-x-5 transform-gpu origin-top-left left-0":
                  type === "inset",
              }
            )}
            htmlFor={htmlFor}
            onFocus={(event) => onFocusHandler(event)}
            onBlur={(event) => onBlurHandler(event)}
            style={{
              width:
                type === "inset" ? (labelWidth ? `${labelWidth}px` : "") : "",
            }}
          >
            <p>{`${label} ${required ? "*" : ""} ${error ? "-" : ""} ${
              error ? error : ""
            }`}</p>
          </label>
        ) : (
          ""
        )}
      </>
    );
  }
);

export default React.memo(InputLabelBase);

InputLabelBase.displayName = "InputLabelBase";
