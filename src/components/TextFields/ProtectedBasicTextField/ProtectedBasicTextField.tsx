import { FC } from "react";
import TextFieldBase, { TextFieldBaseProps } from "../TextFieldBase";

export type ProtectedBasicTextFieldProps = Omit<
  TextFieldBaseProps,
  | "enableProtectedToggle"
  | "type"
  | "fontStyle"
  | "inputHeight"
  | "inputWidth"
  | "focusHighlight"
>;

const ProtectedBasicTextField: FC<ProtectedBasicTextFieldProps> = (props) => {
  return (
    <TextFieldBase
      id={props.id}
      disabled={props.disabled}
      required={props.required}
      onChangeInput={props.onChangeInput}
      valid={props.valid}
      labelName={props.labelName}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      focusHighlight={false}
      enableProtectedToggle={true}
      type="password"
      fontStyle="font-normal text-base leading-[28px]"
      inputHeight="h-[70px]"
      inputWidth="w-full"
    />
  );
};

export default ProtectedBasicTextField;
