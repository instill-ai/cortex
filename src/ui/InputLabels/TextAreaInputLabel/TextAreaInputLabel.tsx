import React from "react";
import InputLabelBase, { InputLabelBaseProps } from "../InputLabelBase";

export type TextAreaInputLabelKeys =
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
  | "errorLabelTextColor";

export type TextAreaInputLabelProps = Omit<
  InputLabelBaseProps,
  TextAreaInputLabelKeys
>;

export type TextAreaInputLabelConfig = Pick<
  InputLabelBaseProps,
  TextAreaInputLabelKeys
>;

export const basicInputLabelConfig: TextAreaInputLabelConfig = {
  labelFontSize: "text-sm",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey50",
  labelLineHeight: "leading-[18.2px]",
  labelFontFamily: "font-sans",
  labelActivateStyle: "top-0 translate-y-3",
  labelDeActivateStyle: "top-0 translate-y-[26px]",
  errorLabelFontFamily: "font-sans",
  errorLabelFontSize: "text-sm",
  errorLabelFontWeight: "font-normal",
  errorLabelLineHeight: "leading-[18.2px]",
  errorLabelTextColor: "text-instillRed",
};

const TextAreaInputLabel: React.FC<TextAreaInputLabelProps> = (props) => {
  const {
    focus,
    error,
    message,
    labelWidth,
    required,
    answered,
    htmlFor,
    type,
    setFocus,
    label,
  } = props;

  return (
    <InputLabelBase
      label={label}
      error={error}
      message={message}
      labelWidth={labelWidth}
      focus={focus}
      required={required}
      answered={answered}
      htmlFor={htmlFor}
      type={type}
      setFocus={setFocus}
      {...basicInputLabelConfig}
    />
  );
};

export default TextAreaInputLabel;
