import { FC } from "react";
import TextAreaBase, { TextAreaBaseProps } from "../TextAreaBase/TextAreaBase";

export type BasicTextAreaProps = Omit<
  TextAreaBaseProps,
  | "inputHeight"
  | "inputWidth"
  | "focusHighlight"
  | "fontSize"
  | "fontWeight"
  | "lineHeight"
  | "textColor"
  | "readOnlyBgColor"
  | "disabledBgColor"
  | "bgColor"
>;
export const BasicTextArea: FC<BasicTextAreaProps> = (props) => {
  return (
    <TextAreaBase
      id={props.id}
      disabled={props.disabled}
      required={props.required}
      onChangeInput={props.onChangeInput}
      valid={props.valid}
      labelName={props.labelName}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      resize={props.resize}
      inputHeight="h-[140px]"
      inputWidth="w-full"
      focusHighlight={false}
      fontSize="text-base"
      fontWeight="font-normal"
      lineHeight="leading-[28px]"
      textColor="text-instillGray95"
      readOnlyBgColor="bg-white"
      disabledBgColor="bg-white"
      bgColor="bg-white"
    />
  );
};
