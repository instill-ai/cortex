import React from "react";
import InputLabelBase, { InputLabelBaseProps } from "../InputLabelBase";

export type TextAreaInputLabelProps = Omit<
  InputLabelBaseProps,
  | "labelFontSize"
  | "labelFontWeight"
  | "labelTextColor"
  | "labelLineHeight"
  | "labelFontFamily"
  | "labelActivateStyle"
  | "labelDeActivateStyle"
  | "errorLabelFontFamily"
  | "errorLabelFontSize"
  | "errorLabelFontWeight"
  | "errorLabelLineHeight"
  | "errorLabelTextColor"
>;

const TextAreaInputLabel: React.FC<TextAreaInputLabelProps> = (props) => {
  return (
    <InputLabelBase
      label={props.label}
      error={props.error}
      message={props.message}
      labelWidth={props.labelWidth}
      focus={props.focus}
      required={props.required}
      answered={props.answered}
      htmlFor={props.htmlFor}
      type={props.type}
      setFocus={props.setFocus}
      labelFontSize="text-sm"
      labelFontWeight="font-normal"
      labelTextColor="text-instillGrey50"
      labelLineHeight="leading-[18.2px]"
      labelFontFamily="font-sans"
      labelActivateStyle="top-0 translate-y-3"
      labelDeActivateStyle="top-0 translate-y-[26px]"
      errorLabelFontFamily="font-sans"
      errorLabelFontSize="text-sm"
      errorLabelFontWeight="font-normal"
      errorLabelLineHeight="leading-[18.2px]"
      errorLabelTextColor="text-instillRed"
    />
  );
};

export default TextAreaInputLabel;
