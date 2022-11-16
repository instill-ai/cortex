import React from "react";
import {
  basicInputDescriptionConfig,
  BasicInputDescriptionOmitKeys,
} from "../../InputDescriptions";
import SingleSelectBase, { SingleSelectBaseProps } from "../SingleSelectBase";

export type BasicSingleSelectRequiredKeys =
  | "id"
  | "instanceId"
  | "label"
  | "value"
  | "options"
  | "onChange";

export type BasicSingleSelectOmitKeys =
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

export type FullBasicSingleSelectProps = Omit<
  SingleSelectBaseProps,
  BasicSingleSelectOmitKeys | BasicInputDescriptionOmitKeys
>;

export type BasicSingleSelectRequiredProps = Pick<
  FullBasicSingleSelectProps,
  BasicSingleSelectRequiredKeys
>;

export type BasicSingleSelectOptionalProps = Partial<
  Omit<FullBasicSingleSelectProps, BasicSingleSelectRequiredKeys>
>;

export type BasicSingleSelectConfig = Pick<
  SingleSelectBaseProps,
  BasicSingleSelectOmitKeys
>;

export const basicSingleSelectConfig: BasicSingleSelectConfig = {
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

export type BasicSingleSelectProps = BasicSingleSelectRequiredProps &
  BasicSingleSelectOptionalProps;

const BasicSingleSelect: React.FC<BasicSingleSelectProps> = (props) => {
  return (
    <SingleSelectBase
      {...props}
      id={props.id}
      inputLabelType={props.inputLabelType ?? "inset"}
      instanceId={props.instanceId}
      onChange={props.onChange}
      value={props.value}
      options={props.options}
      label={props.label}
      onFocus={props.onFocus ?? null}
      onBlur={props.onBlur ?? null}
      additionalMessageOnLabel={props.additionalMessageOnLabel ?? null}
      menuPlacement={props.menuPlacement ?? "auto"}
      description={props.description ?? ""}
      error={props.error ?? null}
      disabled={props.disabled ?? false}
      readOnly={props.readOnly ?? false}
      required={props.required ?? false}
      isClearable={props.isClearable ?? false}
      {...basicInputDescriptionConfig}
      {...basicSingleSelectConfig}
    />
  );
};

export default BasicSingleSelect;
