import { FC } from "react";
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
  | "disabledBgColor"
  | "readOnlyBgColor"
  | "enableProtectedToggle"
  | "borderRadius"
  | "inputLabelType"
>;

const BasicTextField: FC<BasicTextFieldProps> = (props) => {
  return (
    <TextFieldBase
      id={props.id}
      disabled={props.disabled}
      type={props.type}
      required={props.required}
      onChangeInput={props.onChangeInput}
      valid={props.valid}
      labelName={props.labelName}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      inputHeight="h-[70px]"
      inputWidth="w-full"
      focusHighlight={false}
      inputFontSize="text-base"
      inputLineHeight="leading-[28px]"
      inputFontWeight="font-normal"
      inputTextColor="text-instillGray95"
      bgColor="bg-white"
      enableProtectedToggle={false}
      readOnlyBgColor="bg-white"
      disabledBgColor="disabled:bg-white"
      borderRadius="rounded-[1px]"
      inputLabelType="inset"
    />
  );
};

export default BasicTextField;
