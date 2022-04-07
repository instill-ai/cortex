import { FC } from "react";
import ToggleFieldBase, { ToggleFieldBaseProps } from "../ToggleFieldBase";

export type BasicToggleFieldProps = Omit<
  ToggleFieldBaseProps,
  "focusHighlight" | "dotColor" | "checkedDotColor" | "borderRadius"
>;

export const BasicToggleField: FC<BasicToggleFieldProps> = (props) => {
  return (
    <ToggleFieldBase
      id={props.id}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChangeInput={props.onChangeInput}
      required={props.required}
      labelName={props.labelName}
      focusHighlight={true}
      dotColor="bg-instillGray30"
      checkedDotColor="peer-checked:bg-instillBlue30"
      borderRadius=""
    />
  );
};
