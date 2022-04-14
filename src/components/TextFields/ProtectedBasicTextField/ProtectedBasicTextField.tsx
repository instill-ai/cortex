import { FC } from "react";
import TextFieldBase, { TextFieldBaseProps } from "../TextFieldBase";

export type ProtectedBasicTextFieldProps = Omit<
  TextFieldBaseProps,
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
>;

const ProtectedBasicTextField: FC<ProtectedBasicTextFieldProps> = (props) => {
  return (
    <TextFieldBase
      id={props.id}
      disabled={props.disabled}
      required={props.required}
      onChangeInput={props.onChangeInput}
      error={props.error}
      labelName={props.labelName}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      focusHighlight={true}
      enableProtectedToggle={true}
      type="password"
      inputFontSize="text-base"
      inputLineHeight="leading-[28px]"
      inputFontWeight="font-normal"
      bgColor="bg-white"
      inputTextColor="text-instillGray95"
      inputHeight="h-[70px]"
      inputWidth="w-full"
      inputLabelType="inset"
      inputBorderRadius="rounded-[1px]"
      inputBorderColor="border-instillGray20"
      inputBorderStyle="border-solid"
      inputBorderWidth="border"
      disabledCursor="disabled:cursor-not-allowed"
      disabledInputBgColor="disabled:bg-white"
      disabledInputBorderColor="disabled:border-instillGray20"
      disabledInputBorderStyle="disabled:border-dashed"
      disabledInputBorderWidth="disabled:border"
      disabledInputTextColor="disabled:text-instillGray50"
      readOnlyCursor="read-only:cursor-auto"
      readOnlyInputBgColor="read-only:bg-white"
      readOnlyInputBorderColor="read-only:border-instillGray20"
      readOnlyInputBorderStyle="read-only:border-solid"
      readOnlyInputBorderWidth="read-only:border"
      readOnlyInputTextColor="read-only:text-instillGray95"
      placeholderFontFamily="placeholder:font-sans"
      placeholderFontSize="placeholder:text-base"
      placeholderFontWeight="placeholder:font-normal"
      placeholderLineHeight="placeholder:leading-[28px]"
      placeholderTextColor="placeholder:text-instillGray95"
    />
  );
};

export default ProtectedBasicTextField;
