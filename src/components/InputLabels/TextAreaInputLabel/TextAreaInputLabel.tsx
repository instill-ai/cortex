import React from "react";
import InputLabelBase, { InputLabelBaseProps } from "../InputLabelBase";

export type TextAreaInputLabelProps = Omit<
  InputLabelBaseProps,
  | "labelFontSize"
  | "labelFontWeight"
  | "labelTextColor"
  | "labelLineHeight"
  | "labelFontFamily"
  | "activateStyle"
  | "deActivateStyle"
>;

const TextAreaInputLabel: React.FC<TextAreaInputLabelProps> = (props) => {
  return (
    <InputLabelBase
      label={props.label}
      focus={props.focus}
      required={props.required}
      answered={props.answered}
      htmlFor={props.htmlFor}
      type={props.type}
      onBlurHandler={props.onBlurHandler}
      onFocusHandler={props.onFocusHandler}
      labelFontSize="text-sm"
      labelFontWeight="font-normal"
      labelTextColor="text-instillGrey50"
      labelLineHeight="leading-[18.2px]"
      labelFontFamily="font-sans"
      activateStyle="top-0 translate-y-3"
      deActivateStyle="top-0 translate-y-[26px]"
    />
  );
};

export default TextAreaInputLabel;
