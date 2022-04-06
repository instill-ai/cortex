import { FC } from "react";
import TextFieldBase, { TextFieldBaseProps } from "../TextFieldBase";

export type BasicTextFieldProps = Omit<
  TextFieldBaseProps,
  | "inputHeight"
  | "inputWidth"
  | "focusHighlight"
  | "fontSize"
  | "lineHeight"
  | "fontWeight"
  | "bgColor"
  | "textColor"
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
      fontSize="text-base"
      lineHeight="leading-[28px]"
      fontWeight="font-normal"
      bgColor="bg-white"
      textColor="text-instillGray95"
      enableProtectedToggle={false}
      readOnlyBgColor="bg-white"
      disabledBgColor="disabled:bg-white"
      borderRadius="rounded"
      inputLabelType="inset"
    />
  );
};

export default BasicTextField;
