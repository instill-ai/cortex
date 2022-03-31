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
}

const InputLabel: FC<InputLabelProps> = memo(
  ({ htmlFor, required, focus, answered, children, fontStyle }) => {
    let activate: boolean;

    if (focus) {
      activate = true;
    } else {
      activate = answered ? true : false;
    }

    return (
      <label
        className={cn(
          "absolute font-sans transform-gpu origin-top-left left-0 top-0 text-instillGray50",
          activate
            ? "top-1/2 translate-x-5 -translate-y-full"
            : "top-1/2 translate-x-5 -translate-y-1/2",
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
