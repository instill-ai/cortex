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
  | "disabledBgColor"
  | "readOnlyBgColor"
  | "inputLabelType"
  | "borderRadius"
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
      inputFontSize="text-base"
      inputLineHeight="leading-[28px]"
      inputFontWeight="font-normal"
      bgColor="bg-white"
      inputTextColor="text-instillGray95"
      inputHeight="h-[70px]"
      inputWidth="w-full"
      disabledBgColor="disabled:bg-white"
      readOnlyBgColor="bg-white"
      inputLabelType="inset"
      borderRadius="rounded-[1px]"
    />
  );
};

export default ProtectedBasicTextField;
