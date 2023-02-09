import React from "react";
import cn from "clsx";
import { Nullable } from "../../../types/general";

export type InputLabelBaseProps = {
  /** Input label's type
   * - normal: input label has normal position layout and doesn't have any animation
   * - inset: input label has absolution position layout, put into the input field and have float up animation with specific activate, deActivate style
   */
  type: "normal" | "inset" | "hide";

  /**
   * Input's error string
   */
  error: Nullable<string>;

  /**
   * Input's additional message
   */
  message: Nullable<string>;

  /**
   * Input label's text
   */
  label: Nullable<string>;

  /** Input label associated input field's id */
  htmlFor: string;

  /** Whether the input is required or not */
  required?: boolean | undefined;

  /** Whether the input is focused or not */
  focus?: boolean | undefined;

  setFocus?: React.Dispatch<React.SetStateAction<boolean>> | undefined;

  /** Whether the input is answered or not */
  answered: boolean;

  /** Input label's width, calculated
   * - If the type is not inset, this field can be null and label will use w-full as default
   */
  labelWidth: Nullable<number>;

  /** TailwindCSS format - Message's text color
   * - e.g. text-instillGrey50
   */
  messageTextColor: string;

  /** TailwindCSS format - Message's font weight
   * - e.g. font-normal
   */
  messageFontWeight: string;

  /** TailwindCSS format - Message's font size
   * - e.g. text-base
   */
  messageFontSize: string;

  /** TailwindCSS format - Message's font family
   * - e.g. font-sans
   */
  messageFontFamily: string;

  /** TailwindCSS format - Message's line height
   * - e.g. leading-normal
   */
  messageLineHeight: string;

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
};

export type InputLabelBaseRef = HTMLLabelElement;

const InputLabelBase = React.forwardRef<InputLabelBaseRef, InputLabelBaseProps>(
  (props, ref) => {
    const {
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
      setFocus,
      type,
      error,
      message,
      messageFontFamily,
      messageFontSize,
      messageFontWeight,
      messageLineHeight,
      messageTextColor,
      errorLabelFontFamily,
      errorLabelFontSize,
      errorLabelFontWeight,
      errorLabelLineHeight,
      errorLabelTextColor,
      labelWidth,
    } = props;

    const [activate, setActivate] = React.useState(false);

    React.useEffect(() => {
      if (focus) {
        setActivate(true);
        return;
      }

      if (answered) {
        setActivate(true);
        return;
      }

      setActivate(false);
    }, [focus, answered]);

    if (!label) return null;

    return (
      <>
        {type !== "hide" ? (
          <label
            ref={ref}
            className={cn(
              "z-10 flex flex-row gap-x-2",
              type === "inset"
                ? error
                  ? "top-5"
                  : activate
                  ? labelActivateStyle
                  : labelDeActivateStyle
                : "w-full",
              {
                "absolute translate-x-5 transform-gpu origin-top-left left-0":
                  type === "inset",
              }
            )}
            htmlFor={htmlFor}
            onClick={() => {
              if (setFocus) {
                setFocus(true);
              }
            }}
            style={{
              width:
                type === "inset" ? (labelWidth ? `${labelWidth}px` : "") : "",
            }}
          >
            <p
              className={
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
                    )
              }
            >{`${label} ${required ? "*" : ""}`}</p>
            <p
              className={cn(
                "my-auto",
                messageFontFamily,
                messageLineHeight,
                messageFontSize,
                messageFontWeight,
                error ? errorLabelTextColor : messageTextColor
              )}
            >
              {error ? error : message}
            </p>
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
