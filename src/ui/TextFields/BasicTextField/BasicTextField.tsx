import React from "react";
import {
  basicInputDescriptionConfig,
  BasicInputDescriptionOmitKeys,
} from "../../InputDescriptions";
import TextFieldBase, { TextFieldBaseProps } from "../TextFieldBase";

export type BasicTextFieldRequiredKeys = "id" | "value" | "onChange" | "label";

export type BasicTextFieldOmitKeys =
  | "inputHeight"
  | "inputWidth"
  | "focusHighlight"
  | "inputFontSize"
  | "inputLineHeight"
  | "inputFontWeight"
  | "inputTextColor"
  | "bgColor"
  | "enableProtectedToggle"
  | "inputBgColor"
  | "inputBorderRadius"
  | "inputBorderColor"
  | "inputBorderStyle"
  | "inputBorderWidth"
  | "disabledCursor"
  | "disabledInputBgColor"
  | "disabledInputBorderColor"
  | "disabledInputBorderStyle"
  | "disabledInputBorderWidth"
  | "disabledInputTextColor"
  | "readOnlyCursor"
  | "readOnlyInputBgColor"
  | "readOnlyInputBorderColor"
  | "readOnlyInputBorderStyle"
  | "readOnlyInputBorderWidth"
  | "readOnlyInputTextColor"
  | "placeholderFontFamily"
  | "placeholderFontSize"
  | "placeholderFontWeight"
  | "placeholderLineHeight"
  | "placeholderTextColor"
  | "labelFontSize"
  | "labelFontWeight"
  | "labelTextColor"
  | "labelLineHeight"
  | "labelFontFamily"
  | "labelActivateStyle"
  | "labelDeActivateStyle"
  | "errorInputBgColor"
  | "errorLabelFontFamily"
  | "errorLabelFontSize"
  | "errorLabelFontWeight"
  | "errorLabelLineHeight"
  | "errorLabelTextColor"
  | "errorInputBorderColor"
  | "errorInputBorderWidth"
  | "errorInputBorderStyle"
  | "errorInputTextColor"
  | "messageFontFamily"
  | "messageFontSize"
  | "messageFontWeight"
  | "messageLineHeight"
  | "messageTextColor";

export type BasicTextFieldConfig = Pick<
  TextFieldBaseProps,
  BasicTextFieldOmitKeys
>;

export const basicTextFieldConfig: BasicTextFieldConfig = {
  inputHeight: "h-[70px]",
  inputWidth: "w-full",
  focusHighlight: true,
  inputBgColor: "bg-white",
  inputFontSize: "text-base",
  inputLineHeight: "leading-[28px]",
  inputFontWeight: "font-normal",
  inputTextColor: "text-instillGrey95",
  bgColor: "bg-white",
  enableProtectedToggle: false,
  inputBorderRadius: "rounded-[1px]",
  inputBorderColor: "border-instillGrey20",
  inputBorderStyle: "border-solid",
  inputBorderWidth: "border",
  disabledCursor: "cursor-not-allowed",
  disabledInputBgColor: "bg-white",
  disabledInputBorderColor: "border-instillGrey20",
  disabledInputBorderStyle: "border-dashed",
  disabledInputBorderWidth: "border",
  disabledInputTextColor: "text-instillGrey50",
  readOnlyCursor: "cursor-auto",
  readOnlyInputBgColor: "bg-white",
  readOnlyInputBorderColor: "border-instillGrey20",
  readOnlyInputBorderStyle: "border-solid",
  readOnlyInputBorderWidth: "border",
  readOnlyInputTextColor: "text-instillGrey95",
  placeholderFontFamily: "placeholder:font-sans",
  placeholderFontSize: "placeholder:text-base",
  placeholderFontWeight: "placeholder:font-normal",
  placeholderLineHeight: "placeholder:leading-[28px]",
  placeholderTextColor: "placeholder:text-instillGrey95",
  labelFontSize: "text-sm",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey90",
  labelFontFamily: "font-sans",
  labelLineHeight: "leading-[18.2px]",
  labelActivateStyle: "top-1/2 -translate-y-[120%]",
  labelDeActivateStyle: "top-1/2 -translate-y-1/2",
  errorInputBgColor: "bg-white",
  errorLabelFontFamily: "font-sans",
  errorLabelFontSize: "text-sm",
  errorLabelFontWeight: "font-normal",
  errorLabelLineHeight: "leading-[18.2px]",
  errorLabelTextColor: "text-instillRed",
  errorInputBorderColor: "border-instillRed",
  errorInputBorderWidth: "border",
  errorInputBorderStyle: "border-solid",
  errorInputTextColor: "text-instillRed",
  messageFontSize: "text-xs",
  messageTextColor: "text-instillGrey70",
  messageFontFamily: "font-sans",
  messageFontWeight: "font-normal",
  messageLineHeight: "",
};

export type FullBasicTextFieldProps = Omit<
  TextFieldBaseProps,
  BasicTextFieldOmitKeys | BasicInputDescriptionOmitKeys
>;

export type BasicTextFieldRequiredProps = Pick<
  FullBasicTextFieldProps,
  BasicTextFieldRequiredKeys
>;

export type BasicTextFieldOptionalProps = Partial<
  Omit<FullBasicTextFieldProps, BasicTextFieldRequiredKeys>
>;

export type BasicTextFieldProps = BasicTextFieldRequiredProps &
  BasicTextFieldOptionalProps;

export const BasicTextField: React.FC<BasicTextFieldProps> = (props) => {
  const {
    id,
    inputLabelType,
    label,
    onChange,
    value,
    description,
    additionalMessageOnLabel,
    disabled,
    required,
    readOnly,
    error,
    autoComplete,
    placeholder,
    type,
    ...passThrough
  } = props;

  return (
    <TextFieldBase
      {...passThrough}
      id={id}
      inputLabelType={inputLabelType || "normal"}
      value={value}
      onChange={onChange}
      label={label}
      additionalMessageOnLabel={additionalMessageOnLabel ?? null}
      description={description ?? ""}
      disabled={disabled ?? false}
      type={type ?? "text"}
      required={required ?? false}
      error={error ?? null}
      autoComplete={autoComplete ?? "off"}
      placeholder={placeholder ?? ""}
      readOnly={readOnly ?? false}
      {...basicTextFieldConfig}
      {...basicInputDescriptionConfig}
    />
  );
};
