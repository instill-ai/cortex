import React from "react";
import {
  basicInputDescriptionConfig,
  BasicInputDescriptionOmitKeys,
} from "../../InputDescriptions";
import TextAreaBase, { TextAreaBaseProps } from "../TextAreaBase/TextAreaBase";

export type NormalLabelTextAreaRequiredKeys =
  | "id"
  | "value"
  | "onChange"
  | "label";

export type NormalLabelTextAreaOmitKeys =
  | "inputHeight"
  | "inputWidth"
  | "focusHighlight"
  | "inputFontSize"
  | "inputFontWeight"
  | "inputLineHeight"
  | "inputTextColor"
  | "bgColor"
  | "inputBgColor"
  | "inputBorderRadius"
  | "inputBorderColor"
  | "inputBorderStyle"
  | "inputBorderWidth"
  | "inputLabelType"
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
  | "counterFontFamily"
  | "counterFontSize"
  | "counterFontWeight"
  | "counterLineHeight"
  | "counterTextColor"
  | "labelFontSize"
  | "labelFontWeight"
  | "labelTextColor"
  | "labelLineHeight"
  | "labelFontFamily"
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

export type NormalLabelTextAreaConfig = Pick<
  TextAreaBaseProps,
  NormalLabelTextAreaOmitKeys
>;

export const normalLabelTextAreaConfig: NormalLabelTextAreaConfig = {
  inputBgColor: "bg-white",
  counterFontFamily: "font-sans",
  counterFontSize: "text-xs",
  counterFontWeight: "font-normal",
  counterLineHeight: "leanding-[15.6px]",
  counterTextColor: "text-instillGrey20",
  inputHeight: "h-[140px]",
  inputWidth: "w-full",
  focusHighlight: true,
  inputFontSize: "text-base",
  inputFontWeight: "font-normal",
  inputLineHeight: "leading-[28px]",
  inputTextColor: "text-instillGrey95",
  bgColor: "bg-white",
  inputBorderRadius: "rounded-[1px]",
  inputBorderColor: "border-instillGrey20",
  inputBorderStyle: "border-solid",
  inputBorderWidth: "border",
  inputLabelType: "normal",
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

export type FullNormalLabelTextAreaProps = Omit<
  TextAreaBaseProps,
  BasicInputDescriptionOmitKeys | NormalLabelTextAreaOmitKeys
>;

export type NormalLabelTextAreaRequiredProps = Pick<
  FullNormalLabelTextAreaProps,
  NormalLabelTextAreaRequiredKeys
>;

export type NormalLabelTextAreaOptionalProps = Partial<
  Omit<FullNormalLabelTextAreaProps, NormalLabelTextAreaRequiredKeys>
>;

export type NormalLabelTextAreaProps = NormalLabelTextAreaRequiredProps &
  NormalLabelTextAreaOptionalProps;

export const NormalLabelTextArea: React.FC<NormalLabelTextAreaProps> = (
  props
) => {
  const {
    id,
    label,
    onChange,
    value,
    description,
    additionalMessageOnLabel,
    enableCounter,
    counterWordLimit,
    disabled,
    required,
    readOnly,
    error,
    autoComplete,
    placeholder,
    ...passThrough
  } = props;

  return (
    <TextAreaBase
      {...passThrough}
      id={id}
      label={label}
      onChange={onChange}
      value={value}
      description={description ?? ""}
      additionalMessageOnLabel={additionalMessageOnLabel ?? null}
      enableCounter={enableCounter ?? false}
      counterWordLimit={counterWordLimit ?? 0}
      disabled={disabled ?? false}
      required={required ?? false}
      readOnly={readOnly ?? false}
      error={error ?? null}
      autoComplete={autoComplete ?? "off"}
      placeholder={placeholder ?? ""}
      {...normalLabelTextAreaConfig}
      {...basicInputDescriptionConfig}
    />
  );
};
