import { FC, useRef, useState } from "react";
import cn from "clsx";
import InputLabel from "../../InputLabel";

export interface TextFieldBaseProps {
  /** Input field's id */
  id: string;

  /** Text field's type
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
   */
  type: string;

  /** TailwindCSS format
   * - Input and Label's font size, line height and font weight
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
}

/**
 * TextFieldBase
 *
 * ### How it implement inset lable transfor
 * - Use top-1/2 + (-terraform-1/2) to make label fix at the center of input box
 * - Use top-1/2 + (-terraform-full) to move label up a little bit
 */

const TextFieldBase: FC<TextFieldBaseProps> = ({
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
  type,
}) => {
  const [focus, setFocus] = useState(false);
  const [answered, setAnswered] = useState(false);

  const widthStyle = inputWidth ?? "w-full";
  const heightStyle = inputHeight ?? "h-[70px]";

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
        fontStyle={fontStyle}
      >
        {labelName}
      </InputLabel>
      <input
        className={cn(
          "pt-6 ring-0 pl-5",
          heightStyle,
          widthStyle,
          fontStyle,
          focusHighlight
            ? "instill-input-highlight"
            : "instill-input-no-highlight"
        )}
        id={id}
        type={type}
        required={required}
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

export default TextFieldBase;
