import React from "react";
import {
  basicInputDescriptionConfig,
  BasicInputDescriptionOmitKeys,
} from "../../InputDescriptions";
import TextFieldBase, { TextFieldBaseProps } from "../TextFieldBase";

export type ProtectedBasicTextFieldRequiredKeys =
  | "id"
  | "value"
  | "onChange"
  | "label";

export type ProtectedBasicTextFieldOmitKeys =
  | "enableProtectedToggle"
  | "type"
  | "inputHeight"
  | "inputWidth"
  | "focusHighlight"
  | "inputFontSize"
  | "inputLineHeight"
  | "inputFontWeight"
  | "bgColor"
  | "inputTextColor"
  | "inputLabelType"
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
  | "autoComplete"
  | "messageFontFamily"
  | "messageFontSize"
  | "messageFontWeight"
  | "messageLineHeight"
  | "messageTextColor";

export type ProtectedBasicTextFieldConfig = Pick<
  TextFieldBaseProps,
  ProtectedBasicTextFieldOmitKeys
>;

export const protectedBasicTextFieldConfig: ProtectedBasicTextFieldConfig = {
  focusHighlight: true,
  enableProtectedToggle: true,
  type: "password",
  inputBgColor: "bg-white",
  inputFontSize: "text-base",
  inputLineHeight: "leading-[28px]",
  inputFontWeight: "font-normal",
  bgColor: "bg-white",
  inputTextColor: "text-instillGrey95",
  inputHeight: "h-[70px]",
  inputWidth: "w-full",
  inputLabelType: "inset",
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
  labelLineHeight: "leading-[18.2px]",
  labelFontFamily: "font-sans",
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
  autoComplete: "off",
  messageFontSize: "text-xs",
  messageTextColor: "text-instillGrey70",
  messageFontFamily: "font-sans",
  messageFontWeight: "font-normal",
  messageLineHeight: "",
};

export type FullProtectedBasicTextFieldProps = Omit<
  TextFieldBaseProps,
  BasicInputDescriptionOmitKeys | ProtectedBasicTextFieldOmitKeys
>;

export type ProtectedBasicTextFieldRequiredProps = Pick<
  FullProtectedBasicTextFieldProps,
  ProtectedBasicTextFieldRequiredKeys
>;

export type ProtectedBasicTextFieldOptionalProps = Partial<
  Omit<FullProtectedBasicTextFieldProps, ProtectedBasicTextFieldRequiredKeys>
>;

export type ProtectedBasicTextFieldProps =
  ProtectedBasicTextFieldRequiredProps & ProtectedBasicTextFieldOptionalProps;

const ProtectedBasicTextField: React.FC<ProtectedBasicTextFieldProps> = (
  props
) => {
  const {
    id,
    label,
    onChange,
    value,
    description,
    additionalMessageOnLabel,
    disabled,
    required,
    readOnly,
    error,
    placeholder,
    ...passThrough
  } = props;

  return (
    <TextFieldBase
      {...passThrough}
      id={id}
      value={value}
      label={label}
      onChange={onChange}
      additionalMessageOnLabel={additionalMessageOnLabel ?? null}
      description={description ?? ""}
      disabled={disabled ?? false}
      required={required ?? false}
      error={error ?? null}
      placeholder={placeholder ?? ""}
      readOnly={readOnly ?? false}
      {...protectedBasicTextFieldConfig}
      {...basicInputDescriptionConfig}
    />
  );
};

export default ProtectedBasicTextField;
