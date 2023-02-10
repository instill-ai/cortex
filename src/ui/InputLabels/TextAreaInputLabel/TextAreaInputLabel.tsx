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
  | "errorLabelTextColor"
  | "messageFontFamily"
  | "messageFontSize"
  | "messageFontWeight"
  | "messageLineHeight"
  | "messageTextColor";

export type TextAreaInputLabelProps = Omit<
  InputLabelBaseProps,
  TextAreaInputLabelKeys
>;

export type TextAreaInputLabelConfig = Pick<
  InputLabelBaseProps,
  TextAreaInputLabelKeys
>;

export const basicInputLabelConfig: TextAreaInputLabelConfig = {
  labelFontSize: "text-base",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey50",
  labelLineHeight: "",
  labelFontFamily: "font-sans",
  labelActivateStyle: "top-0 translate-y-3",
  labelDeActivateStyle: "top-0 translate-y-[26px]",
  errorLabelFontFamily: "font-sans",
  errorLabelFontSize: "text-base",
  errorLabelFontWeight: "font-normal",
  errorLabelLineHeight: "",
  errorLabelTextColor: "text-instillRed",
  messageFontSize: "text-xs",
  messageTextColor: "text-instillGrey70",
  messageFontFamily: "font-sans",
  messageFontWeight: "font-normal",
  messageLineHeight: "",
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
