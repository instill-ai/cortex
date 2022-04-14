import { FC } from "react";
import InputLabelBase, { InputLabelBaseProps } from "../InputLabelBase";

export type BasicInputLabelProps = Omit<
  InputLabelBaseProps,
  | "labelFontSize"
  | "labelFontWeight"
  | "labelTextColor"
  | "labelLineHeight"
  | "labelFontFamily"
>;

const BasicInputLabel: FC<BasicInputLabelProps> = (props) => {
  return (
    <InputLabelBase
      required={props.required}
      answered={props.answered}
      htmlFor={props.htmlFor}
      type={props.type}
      onBlurHandler={props.onBlurHandler}
      onFocusHandler={props.onFocusHandler}
      labelFontSize="text-sm"
      labelFontWeight="font-normal"
      labelTextColor="text-instillGray50"
      labelLineHeight="leading-[18.2px]"
      labelFontFamily="font-sans"
    >
      {props.children}
    </InputLabelBase>
  );
};

export default BasicInputLabel;
