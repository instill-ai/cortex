import React from "react";
import TextAreaBase, { TextAreaBaseProps } from "../TextAreaBase/TextAreaBase";

export type BasicTextAreaProps = Omit<
  TextAreaBaseProps,
  | "inputHeight"
  | "inputWidth"
  | "focusHighlight"
  | "inputFontSize"
  | "inputFontWeight"
  | "inputLineHeight"
  | "inputTextColor"
  | "bgColor"
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
  | "labelActivateStyle"
  | "labelDeActivateStyle"
>;

const BasicTextArea: React.FC<BasicTextAreaProps> = (props) => {
  return (
    <TextAreaBase
      id={props.id}
      description={props.description}
      value={props.value}
      enableCounter={props.enableCounter}
      counterWordLimit={props.counterWordLimit}
      disabled={props.disabled}
      required={props.required}
      onChangeInput={props.onChangeInput}
      error={props.error}
      label={props.label}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      counterFontFamily="font-sans"
      counterFontSize="text-xs"
      counterFontWeight="font-normal"
      counterLineHeight="leanding-[15.6px]"
      counterTextColor="text-instillGrey20"
      inputHeight="h-[140px]"
      inputWidth="w-full"
      focusHighlight={true}
      inputFontSize="text-base"
      inputFontWeight="font-normal"
      inputLineHeight="leading-[28px]"
      inputTextColor="text-instillGrey95"
      bgColor="bg-white"
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
      labelActivateStyle="top-0 translate-y-3"
      labelDeActivateStyle="top-0 translate-y-[26px]"
    />
  );
};

export default BasicTextArea;
