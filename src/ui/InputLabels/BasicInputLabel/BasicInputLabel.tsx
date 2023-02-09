import React from "react";
import InputLabelBase, { InputLabelBaseProps } from "../InputLabelBase";

export type BasicInputLabelOmitKeys =
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

export type BasicInputLabelProps = Omit<
  InputLabelBaseProps,
  BasicInputLabelOmitKeys
>;

export type BasicInputLabelConfig = Pick<
  InputLabelBaseProps,
  BasicInputLabelOmitKeys
>;

export const basicInputLabelConfig: BasicInputLabelConfig = {
  labelFontSize: "text-sm",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey90",
  labelLineHeight: "leading-[18.2px]",
  labelFontFamily: "font-sans",
  labelActivateStyle: "top-1/2 -translate-y-[120%]",
  labelDeActivateStyle: "top-1/2 -translate-y-1/2",
  errorLabelFontFamily: "font-sans",
  errorLabelFontSize: "text-sm",
  errorLabelFontWeight: "font-normal",
  errorLabelLineHeight: "leading-[18.2px]",
  errorLabelTextColor: "text-instillRed",
  messageFontSize: "text-xs",
  messageTextColor: "text-instillGrey70",
  messageFontFamily: "font-sans",
  messageFontWeight: "font-normal",
  messageLineHeight: "",
};

const BasicInputLabel: React.FC<BasicInputLabelProps> = (props) => {
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
      focus={focus}
      error={error}
      message={message}
      labelWidth={labelWidth}
      required={required}
      answered={answered}
      htmlFor={htmlFor}
      type={type}
      setFocus={setFocus}
      label={label}
      {...basicInputLabelConfig}
    />
  );
};

export default BasicInputLabel;
