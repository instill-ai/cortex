import React from "react";
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

const BasicToggleField: React.FC<BasicToggleFieldProps> = (props) => {
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
      dotColor="bg-instillGrey30"
      checkedDotColor=":bg-instillBlue50"
      inputBorderRadius=""
      inputBorderColor="border-instillGray20"
      inputBorderStyle="border-solid"
      inputBorderWidth="border"
      checkedInputBorderColor="border-instillBlue50"
      disabledDotColor="bg-instillGray20"
      disabledCheckedDotColor=":bg-[#8DF5FF]"
      disabledCursor="cursor-not-allowed"
      disabledInputBgColor="bg-white"
      disabledInputBorderColor="border-instillGray20"
      disabledInputBorderStyle="border-dashed"
      disabledInputBorderWidth="border"
      disabledCheckedInputBorderColor="border-instillGray20"
      readOnlyCursor="cursor-auto"
      readOnlyInputBgColor="bg-white"
      readOnlyInputBorderColor="border-instillGray20"
      readOnlyInputBorderStyle="border-solid"
      readOnlyInputBorderWidth="border"
      readOnlyCheckedInputBorderColor="border-[#8DF5FF]"
      readOnlyCheckedDotColor=":bg-[#8DF5FF]"
      readOnlyDotColor="bg-instillGray20"
    />
  );
};

export default BasicToggleField;
