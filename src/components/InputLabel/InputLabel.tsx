import { FC, memo } from "react";
import cn from "clsx";

export interface InputLabelProps {
  /** Input field id */
  htmlFor: string;

  /** TailwindCSS format
   * - Label's font size, line height and font weight
   */
  fontStyle: string;

  /** Whether the input is required or not */
  required: boolean;

  /** Whether the input is focused or not */
  focus: boolean;

  /** Whether the input is answered or not */
  answered: boolean;

  /** TailwindCSS format
   * - Activate mean whether the input is being focused or the input field was answered
   * - Don't need to specific translate-x-, it's fixed value
   */
  activateStyle: string;

  /** TailwindCSS format
   * - Activate mean whether the input is being focused or the input field was answered
   * - Don't need to specific translate-x-, it's fixed value
   */
  deActivateStyle: string;
}

const InputLabel: FC<InputLabelProps> = memo(
  ({
    htmlFor,
    required,
    focus,
    answered,
    children,
    fontStyle,
    activateStyle,
    deActivateStyle,
  }) => {
    let activate: boolean;

    if (focus) {
      activate = true;
    } else {
      activate = answered ? true : false;
    }

    return (
      <label
        className={cn(
          "absolute font-sans transform-gpu origin-top-left left-0 text-instillGray50 translate-x-5",
          activate ? activateStyle : deActivateStyle,
          fontStyle
        )}
        htmlFor={htmlFor}
      >
        {children}
        {required ? <span className="ml-1">*</span> : null}
      </label>
    );
  }
);

export default InputLabel;

InputLabel.displayName = "InputLabel";
