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
      inputHeight="h-[70px]"
      inputWidth="w-full"
      focusHighlight={false}
      fontSize="text-base"
      lineHeight="leading-[28px]"
      fontWeight="font-normal"
      bgColor="bg-white"
      textColor="text-instillGray95"
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      enableProtectedToggle={false}
    />
  );
};

export default BasicTextField;
