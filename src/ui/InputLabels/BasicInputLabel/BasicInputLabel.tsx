import React from "react";
import InputLabelBase, { InputLabelBaseProps } from "../InputLabelBase";

export type BasicInputLabelOmitKeys =
  | "labelFontSize"
  | "labelFontWeight"
  | "labelTextColor"
  | "labelLineHeight"
  | "labelFontFamily"
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

export type BasicInputLabelProps = Omit<
  InputLabelBaseProps,
  BasicInputLabelOmitKeys
>;

export type BasicInputLabelConfig = Pick<
  InputLabelBaseProps,
  BasicInputLabelOmitKeys
>;

export const basicInputLabelConfig: BasicInputLabelConfig = {
  labelFontSize: "text-base",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey90",
  labelLineHeight: "",
  labelFontFamily: "font-sans",
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

const BasicInputLabel: React.FC<BasicInputLabelProps> = (props) => {
  const { error, message, required, answered, htmlFor, type, label } = props;

  return (
    <InputLabelBase
      error={error}
      message={message}
      required={required}
      answered={answered}
      htmlFor={htmlFor}
      type={type}
      label={label}
      {...basicInputLabelConfig}
    />
  );
};

export default BasicInputLabel;
