import { FC } from "react";
import TextFieldBase, { TextFieldBaseProps } from "../TextFieldBase";

export type BasicTextField = Omit<
  TextFieldBaseProps,
  "inputHeight" | "inputWidth" | "focusHighlight"
>;

const BasicTextField: FC<BasicTextField> = (props) => {
  return (
    <TextFieldBase
      id={props.id}
      onChangeInput={props.onChangeInput}
      required={props.required}
      valid={props.valid}
      labelName={props.labelName}
      autoComplete={props.autoComplete}
      inputHeight="h-[70px]"
      inputWidth="w-full"
      focusHighlight={false}
    />
  );
};

export default BasicTextField;
