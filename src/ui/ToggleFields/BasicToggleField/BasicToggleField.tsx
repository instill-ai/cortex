import React from "react";
import {
  basicInputDescriptionConfig,
  BasicInputDescriptionOmitKeys,
} from "../../InputDescriptions";
import ToggleFieldBase, { ToggleFieldBaseProps } from "../ToggleFieldBase";

export type BasicToggleFieldRequiredKeys =
  | "id"
  | "value"
  | "onChange"
  | "label";

export type BasicToggleFieldOmitKeys =
  | "focusHighlight"
  | "dotColor"
  | "checkedDotColor"
  | "inputBorderRadius"
  | "inputBorderColor"
  | "inputBorderStyle"
  | "inputBorderWidth"
  | "inputBgColor"
  | "inputShadow"
  | "inputFocusBorderColor"
  | "inputFocusShadow"
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
  | "labelFontSize"
  | "labelFontWeight"
  | "labelTextColor"
  | "labelLineHeight"
  | "labelFontFamily"
  | "labelActivateStyle"
  | "labelDeActivateStyle"
  | "errorLabelFontFamily"
  | "errorLabelFontSize"
  | "errorLabelFontWeight"
  | "errorLabelLineHeight"
  | "errorLabelTextColor";

export type FullBasicToggleFieldProps = Omit<
  ToggleFieldBaseProps,
  BasicToggleFieldOmitKeys | BasicInputDescriptionOmitKeys
>;

export type BasicToggleFieldRequiredProps = Pick<
  FullBasicToggleFieldProps,
  BasicToggleFieldRequiredKeys
>;

export type BasicToggleFieldOptionalProps = Partial<
  Omit<FullBasicToggleFieldProps, BasicToggleFieldRequiredKeys>
>;

export type BasicToggleFieldConfig = Pick<
  ToggleFieldBaseProps,
  BasicToggleFieldOmitKeys
>;

export type BasicToggleFieldProps = BasicToggleFieldRequiredProps &
  BasicToggleFieldOptionalProps;

export const basicToggleFieldConfig: BasicToggleFieldConfig = {
  focusHighlight: true,
  dotColor: "bg-instillGrey30",
  checkedDotColor: "bg-instillBlue50",
  inputBgColor: "bg-white",
  inputBorderRadius: "",
  inputBorderColor: "border-instillGrey20",
  inputBorderStyle: "border-solid",
  inputBorderWidth: "border",
  inputShadow: null,
  inputFocusBorderColor: "border-instillBlue50",
  inputFocusShadow: "instill-input-focus-shadow",
  checkedInputBorderColor: "border-instillBlue50",
  disabledDotColor: "bg-instillGrey20",
  disabledCheckedDotColor: "bg-[#8DF5FF]",
  disabledCursor: "cursor-not-allowed",
  disabledInputBgColor: "bg-white",
  disabledInputBorderColor: "border-instillGrey20",
  disabledInputBorderStyle: "border-dashed",
  disabledInputBorderWidth: "border",
  disabledCheckedInputBorderColor: "border-instillGrey20",
  readOnlyCursor: "cursor-auto",
  readOnlyInputBgColor: "bg-white",
  readOnlyInputBorderColor: "border-instillGrey20",
  readOnlyInputBorderStyle: "border-solid",
  readOnlyInputBorderWidth: "border",
  readOnlyCheckedInputBorderColor: "border-[#8DF5FF]",
  readOnlyCheckedDotColor: "bg-[#8DF5FF]",
  readOnlyDotColor: "bg-instillGrey20",
  labelFontSize: "text-sm",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey50",
  labelLineHeight: "leading-[18.2px]",
  labelFontFamily: "font-sans",
  labelActivateStyle: "top-1/2 -translate-y-[120%]",
  labelDeActivateStyle: "top-1/2 -translate-y-1/2",
  errorLabelFontFamily: "font-sans",
  errorLabelFontSize: "text-sm",
  errorLabelFontWeight: "font-normal",
  errorLabelLineHeight: "leading-[18.2px]",
  errorLabelTextColor: "text-instillRed",
};

const BasicToggleField: React.FC<BasicToggleFieldProps> = (props) => {
  const {
    id,
    value,
    label,
    onChange,
    description,
    additionalMessageOnLabel,
    error,
    readOnly,
    required,
    disabled,
    ...passThrough
  } = props;

  return (
    <ToggleFieldBase
      {...passThrough}
      id={id}
      value={value}
      label={label}
      onChange={onChange}
      description={description ?? ""}
      additionalMessageOnLabel={additionalMessageOnLabel ?? null}
      error={error ?? null}
      readOnly={readOnly ?? false}
      required={required ?? false}
      disabled={disabled ?? false}
      {...basicToggleFieldConfig}
      {...basicInputDescriptionConfig}
    />
  );
};

export default BasicToggleField;
