import { FC, useRef, useState } from "react";
import cn from "clsx";
import InputLabel from "../../InputLabel";

export interface TextFieldBaseProps {
  id: string;

  onChangeInput: (inputValue: string) => void;
  required: boolean;
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

  /**  */
  autoComplete: string;
}

const TextFieldBase: FC<TextFieldBaseProps> = ({
  onChangeInput,
  id,
  required,
  valid,
  labelName,
  inputWidth,
  inputHeight,
  autoComplete,
  focusHighlight,
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
      >
        {labelName}
      </InputLabel>
      <input
        className={cn(
          "pt-6 ring-0 pl-5",
          heightStyle,
          widthStyle,
          focusHighlight
            ? "instill-input-highlight"
            : "instill-input-no-highlight"
        )}
        id={id}
        type="text"
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
