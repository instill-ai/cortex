import { FC } from "react";
import TextFieldBase, { TextFieldBaseProps } from "../TextFieldBase";

export type BasicTextFieldProps = Omit<
  TextFieldBaseProps,
  "inputHeight" | "inputWidth" | "focusHighlight" | "fontStyle"
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
      fontStyle="font-normal text-base leading-[28px]"
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      enableProtectedToggle={false}
    />
  );
};

export default BasicTextField;
