import { FC, useState } from "react";
import cn from "clsx";
import InputLabel from "../../InputLabel";

/**
 * TextAreaBase
 *
 * ### How it implement inset lable transfor
 * - Use top-1/2 + (-terraform-1/2) to make label fix at the center of input box
 * - Use top-1/2 + (-terraform-full) to move label up a little bit
 */

export interface TextAreaBaseProps {
  /** Input field's id */
  id: string;

  /**
   * Whether the form control is disabled
   */
  disabled: boolean;

  /**
   * Text that appears in the form control when it has no value set
   */
  placeholder: string;

  /**
   * Whether The value is editable or not.
   */
  readOnly: boolean;

  /** TailwindCSS format
   * - Input's font size, line height and font weight
   */
  fontStyle: string;

  /** Input on change handler */
  onChangeInput: (inputValue: string) => void;

  /** Whether the field is necessary or not */
  required: boolean;

  /** Whether the input is valid or not */
  valid: boolean;

  /** TextField labelName */
  labelName: string;

  /** TailwindCSS format
   * - Default is w-full, please make sure this component's parent has defined width
   * - if you are not sure about the defined number, please use abitrary number like w-[number-unit] w-[20px].
   */
  inputWidth: string;

  /** focusHighlight
   * - enable: border highlight with intstill blue30
   * - disable: remove default input border highlight, the border will remain initial color and width
   */
  focusHighlight: boolean;

  /** TailwindCSS format
   * - Default is h-[70px]
   * - if you are not sure about the defined number, please use abitrary number like w-[number-unit] w-[20px].
   */
  inputHeight: string;

  /** Specific whether browser should help user auto complete the input or not */
  autoComplete: string;

  /** Control how  textarea can be resized*/
  resize: "both" | "none" | "x" | "y";
}

const TextAreaBase: FC<TextAreaBaseProps> = ({
  onChangeInput,
  id,
  required,
  valid,
  labelName,
  fontStyle,
  inputWidth,
  inputHeight,
  autoComplete,
  focusHighlight,
  disabled,
  placeholder,
  readOnly,
  resize,
}) => {
  const [focus, setFocus] = useState(false);
  const [answered, setAnswered] = useState(false);

  const widthStyle = inputWidth ?? "w-full";
  const heightStyle = inputHeight ?? "h-[70px]";

  let resizeStyle: string;

  switch (resize) {
    case "both":
      resizeStyle = "resize";
      break;
    case "none":
      resizeStyle = "resize-none";
      break;
    case "x":
      resizeStyle = "resize-x";
      break;
    case "y":
      resizeStyle = "resize-y";
      break;
  }

  return (
    <div
      className={cn(
        "flex relative border border-instillGray15 rounded-[1px]",
        widthStyle
      )}
    >
      <InputLabel
        answered={answered}
        focus={focus}
        required={required}
        htmlFor={id}
        fontStyle="font-normal text-sm leading-[18.2px]"
        activateStyle="top-0 translate-y-3"
        deActivateStyle="top-0 translate-y-[26px]"
      >
        {labelName}
      </InputLabel>
      <textarea
        className={cn(
          "mt-[34px] px-5 pb-5 ring-0 pl-5 placeholder:text-instillGray30 min-h-[140px]",
          heightStyle,
          widthStyle,
          fontStyle,
          resizeStyle,
          focusHighlight
            ? "instill-input-highlight"
            : "instill-input-no-highlight"
        )}
        id={id}
        disabled={disabled}
        required={required}
        placeholder={focus ? placeholder : null}
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
    </div>
  );
};

export default TextAreaBase;
