import React from "react";
import {
  basicInputDescriptionConfig,
  BasicInputDescriptionOmitProps,
} from "../../InputDescriptions";
import TextAreaBase, { TextAreaBaseProps } from "../TextAreaBase/TextAreaBase";

export type BasicTextAreaRequiredKeys =
  | "id"
  | "value"
  | "onChangeInput"
  | "label";

export type BasicTextAreaOmitKeys =
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
  | "errorInputTextColor";

export type BasicTextAreaConfig = Pick<
  TextAreaBaseProps,
  BasicTextAreaOmitKeys
>;

export const basicTextAreaConfig: BasicTextAreaConfig = {
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
  inputLabelType: "inset",
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
  labelTextColor: "text-instillGrey50",
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
};

export type FullBasicTextAreaProps = Omit<
  TextAreaBaseProps,
  BasicInputDescriptionOmitProps | BasicTextAreaOmitKeys
>;

export type BasicTextAreaRequiredProps = Pick<
  FullBasicTextAreaProps,
  BasicTextAreaRequiredKeys
>;

export type BasicTextAreaOptionalProps = Partial<
  Omit<FullBasicTextAreaProps, BasicTextAreaRequiredKeys>
>;

export type BasicTextAreaProps = BasicTextAreaRequiredProps &
  BasicTextAreaOptionalProps;

const BasicTextArea: React.FC<BasicTextAreaProps> = (props) => {
  return (
    <TextAreaBase
      id={props.id}
      label={props.label}
      onChangeInput={props.onChangeInput}
      value={props.value}
      description={props.description ?? ""}
      additionalMessageOnLabel={props.additionalMessageOnLabel ?? null}
      enableCounter={props.enableCounter ?? false}
      counterWordLimit={props.counterWordLimit ?? 0}
      disabled={props.disabled ?? false}
      required={props.required ?? false}
      readOnly={props.readOnly ?? false}
      error={props.error ?? null}
      autoComplete={props.autoComplete ?? "off"}
      placeholder={props.placeholder ?? ""}
      {...basicTextAreaConfig}
      {...basicInputDescriptionConfig}
    />
  );
};

export default BasicTextArea;
