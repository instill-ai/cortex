import { FC } from "react";
import ToggleFieldBase, { ToggleFieldBaseProps } from "../ToggleFieldBase";

export type BasicToggleFieldProps = Omit<
  ToggleFieldBaseProps,
  | "focusHighlight"
  | "dotColor"
  | "checkedDotColor"
  | "inputBorderRadius"
  | "inputBorderColor"
  | "inputBorderStyle"
  | "inputBorderWidth"
  | "checkedInputBorderColor"
  | "disabledDotColor"
  | "disabledCheckedDotColor"
  | "disabledCursor"
  | "disabledInputBgColor"
  | "disabledInputBorderColor"
  | "disabledInputBorderStyle"
  | "disabledInputBorderWidth"
  | "disabledCheckedInputBorderColor"
  | "readOnlyCursor"
  | "readOnlyInputBgColor"
  | "readOnlyInputBorderColor"
  | "readOnlyInputBorderStyle"
  | "readOnlyInputBorderWidth"
  | "readOnlyCheckedInputBorderColor"
  | "readOnlyCheckedDotColor"
  | "readOnlyDotColor"
>;

const BasicToggleField: FC<BasicToggleFieldProps> = (props) => {
  return (
    <ToggleFieldBase
      id={props.id}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChangeInput={props.onChangeInput}
      required={props.required}
      labelName={props.labelName}
      defaultChecked={props.defaultChecked}
      focusHighlight={true}
      dotColor="bg-instillGray30"
      checkedDotColor="peer-checked:bg-instillBlue50"
      inputBorderRadius=""
      inputBorderColor="border-instillGray20"
      inputBorderStyle="border-solid"
      inputBorderWidth="border"
      checkedInputBorderColor="checked:border-instillBlue50"
      disabledDotColor="disabled:bg-instillGray20"
      disabledCheckedDotColor="disabled:peer-checked:bg-[#8DF5FF]"
      disabledCursor="disabled:cursor-not-allowed"
      disabledInputBgColor="disabled:bg-white"
      disabledInputBorderColor="disabled:border-instillGray20"
      disabledInputBorderStyle="disabled:border-dashed"
      disabledInputBorderWidth="disabled:border"
      disabledCheckedInputBorderColor="disabled:checked:border-instillGray20"
      readOnlyCursor="read-only:cursor-auto"
      readOnlyInputBgColor="read-only:bg-white"
      readOnlyInputBorderColor="read-only:border-instillGray20"
      readOnlyInputBorderStyle="read-only:border-solid"
      readOnlyInputBorderWidth="read-only:border"
      readOnlyCheckedInputBorderColor="read-only:checked:border-[#8DF5FF]"
      readOnlyCheckedDotColor="read-only:peer-checked:bg-[#8DF5FF]"
      readOnlyDotColor="readonly:bg-instillGray20"
    />
  );
};

export default BasicToggleField;
