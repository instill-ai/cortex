import React from "react";
import {
  basicInputDescriptionConfig,
  BasicInputDescriptionOmitProps,
} from "../../InputDescriptions";
import SingleSelectBase, { SingleSelectBaseProps } from "../SingleSelectBase";

export type BasicSingleSelectProps = Omit<
  SingleSelectBaseProps,
  | "inputLabelType"
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
  | "isClearable"
  | BasicInputDescriptionOmitProps
>;

const BasicSingleSelect: React.FC<BasicSingleSelectProps> = (props) => {
  return (
    <SingleSelectBase
      id={props.id}
      menuPlacement={props.menuPlacement}
      additionalMessageOnLabel={props.additionalMessageOnLabel}
      instanceId={props.instanceId}
      error={props.error}
      label={props.label}
      description={props.description}
      disabled={props.disabled}
      readOnly={props.readOnly}
      required={props.required}
      onChangeInput={props.onChangeInput}
      value={props.value}
      options={props.options}
      isClearable={false}
      inputLabelType="inset"
      labelFontSize="text-sm"
      labelFontWeight="font-normal"
      labelTextColor="text-instillGrey50"
      labelLineHeight="leading-[18.2px]"
      labelFontFamily="font-sans"
      labelActivateStyle="top-1/2 -translate-y-[120%]"
      labelDeActivateStyle="top-1/2 -translate-y-1/2"
      errorLabelFontFamily="font-sans"
      errorLabelFontSize="text-sm"
      errorLabelFontWeight="font-normal"
      errorLabelLineHeight="leading-[18.2px]"
      errorLabelTextColor="text-instillRed"
      {...basicInputDescriptionConfig}
    />
  );
};

export default BasicSingleSelect;
