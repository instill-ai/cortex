import React from "react";
import TextFieldBase, { TextFieldBaseProps } from "../TextFieldBase";

export type BasicTextFieldProps = Omit<
  TextFieldBaseProps,
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
  | "labelFontSize"
  | "labelFontWeight"
  | "labelTextColor"
  | "labelLineHeight"
  | "labelFontFamily"
  | "labelActivateStyle"
  | "labelDeActivateStyle"
  | "descriptionFontFamily"
  | "descriptionFontSize"
  | "descriptionLineHeight"
  | "descriptionFontWeight"
  | "descriptionTextColor"
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
>;

const BasicTextField: React.FC<BasicTextFieldProps> = (props) => {
  return (
    <TextFieldBase
      id={props.id}
      description={props.description}
      disabled={props.disabled}
      type={props.type}
      required={props.required}
      onChangeInput={props.onChangeInput}
      error={props.error}
      label={props.label}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      inputHeight="h-[70px]"
      inputWidth="w-full"
      focusHighlight={true}
      inputBgColor="bg-white"
      inputFontSize="text-base"
      inputLineHeight="leading-[28px]"
      inputFontWeight="font-normal"
      inputTextColor="text-instillGrey95"
      bgColor="bg-white"
      enableProtectedToggle={false}
      inputBorderRadius="rounded-[1px]"
      inputBorderColor="border-instillGrey20"
      inputBorderStyle="border-solid"
      inputBorderWidth="border"
      inputLabelType="inset"
      disabledCursor="cursor-not-allowed"
      disabledInputBgColor="bg-white"
      disabledInputBorderColor="border-instillGrey20"
      disabledInputBorderStyle="border-dashed"
      disabledInputBorderWidth="border"
      disabledInputTextColor="text-instillGrey50"
      readOnlyCursor="cursor-auto"
      readOnlyInputBgColor="bg-white"
      readOnlyInputBorderColor="border-instillGrey20"
      readOnlyInputBorderStyle="border-solid"
      readOnlyInputBorderWidth="border"
      readOnlyInputTextColor="text-instillGrey95"
      placeholderFontFamily="placeholder:font-sans"
      placeholderFontSize="placeholder:text-base"
      placeholderFontWeight="placeholder:font-normal"
      placeholderLineHeight="placeholder:leading-[28px]"
      placeholderTextColor="placeholder:text-instillGrey95"
      labelFontSize="text-sm"
      labelFontWeight="font-normal"
      labelTextColor="text-instillGrey50"
      labelLineHeight="leading-[18.2px]"
      labelFontFamily="font-sans"
      labelActivateStyle="top-1/2 -translate-y-[120%]"
      labelDeActivateStyle="top-1/2 -translate-y-1/2"
      descriptionFontFamily="font-mono"
      descriptionFontSize="text-xs"
      descriptionLineHeight="leading-[15.6px]"
      descriptionFontWeight="font-normal"
      descriptionTextColor="text-instillGrey50"
      errorInputBgColor="bg-white"
      errorLabelFontFamily="font-sans"
      errorLabelFontSize="text-sm"
      errorLabelFontWeight="font-normal"
      errorLabelLineHeight="leading-[18.2px]"
      errorLabelTextColor="text-instillRed"
      errorInputBorderColor="border-instillRed"
      errorInputBorderWidth="border"
      errorInputBorderStyle="border-solid"
      errorInputTextColor="text-instillRed"
    />
  );
};

export default BasicTextField;
