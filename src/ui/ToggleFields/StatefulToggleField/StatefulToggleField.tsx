import React from "react";
import { Nullable, State } from "../../../types/general";
import {
  basicInputDescriptionConfig,
  BasicInputDescriptionOmitKeys,
} from "../../InputDescriptions";
import ToggleFieldBase, { ToggleFieldBaseProps } from "../ToggleFieldBase";

export type StatefulToggleFieldRequiredKeys =
  | "id"
  | "value"
  | "onChange"
  | "label";

export type StatefulToggleFieldOmitKeys =
  | "focusHighlight"
  | "dotColor"
  | "checkedDotColor"
  | "inputBorderRadius"
  | "inputBorderStyle"
  | "inputBorderWidth"
  | "inputBgColor"
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
  | "errorLabelTextColor"
  | "checkedInputBorderColor";

export type FullStatefulToggleFieldProps = Omit<
  ToggleFieldBaseProps,
  StatefulToggleFieldOmitKeys | BasicInputDescriptionOmitKeys
>;

export type StatefulToggleFieldConfig = Pick<
  ToggleFieldBaseProps,
  StatefulToggleFieldOmitKeys
>;

export type StatefulToggleFieldRequiredProps = Pick<
  FullStatefulToggleFieldProps,
  StatefulToggleFieldRequiredKeys
>;

export type StatefulToggleFieldOptionalProps = Partial<
  Omit<FullStatefulToggleFieldProps, StatefulToggleFieldRequiredKeys>
>;

export type StatefulToggleFieldProps = StatefulToggleFieldRequiredProps &
  StatefulToggleFieldOptionalProps & { state: Nullable<State> };

export const statefulToggleFieldConfig: StatefulToggleFieldConfig = {
  focusHighlight: true,
  dotColor: "bg-instillGrey30",
  checkedDotColor: "bg-instillBlue50",
  inputBgColor: "bg-white",
  inputBorderRadius: "",
  inputBorderStyle: "border-solid",
  inputBorderWidth: "border",
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
  checkedInputBorderColor: "border-instillBlue50",
};

const StatefulToggleField: React.FC<StatefulToggleFieldProps> = (props) => {
  return (
    <ToggleFieldBase
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      label={props.label}
      additionalMessageOnLabel={
        props.state === "STATE_LOADING"
          ? "Loading..."
          : props.additionalMessageOnLabel ?? null
      }
      description={props.description ?? ""}
      error={props.error ?? null}
      readOnly={props.readOnly ?? false}
      required={props.required ?? false}
      disabled={props.disabled ?? false}
      inputBorderColor={
        props.state === "STATE_LOADING"
          ? "border-lemonYellow50"
          : "border-instillGrey20"
      }
      inputFocusBorderColor={
        props.state === "STATE_LOADING" ? "" : "border-instillBlue50"
      }
      inputFocusShadow={
        props.state === "STATE_LOADING" ? "" : "instill-input-focus-shadow"
      }
      inputShadow={
        props.state === "STATE_LOADING" ? "instill-toggle-loading-shadow" : null
      }
      {...statefulToggleFieldConfig}
      {...basicInputDescriptionConfig}
    />
  );
};

export default StatefulToggleField;
