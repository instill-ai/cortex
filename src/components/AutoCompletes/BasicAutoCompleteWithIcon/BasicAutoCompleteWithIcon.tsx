import React from "react";
import AutoCompleteWithIconBase, {
  AutoCompleteWithIconBaseProps,
} from "../AutoCompleteWithIconBase";

export type BasicAutoCompleteWithIconProps = Omit<
  AutoCompleteWithIconBaseProps,
  | "inputLabelType"
  | "labelFontSize"
  | "labelFontWeight"
  | "labelTextColor"
  | "labelLineHeight"
  | "labelFontFamily"
  | "labelActivateStyle"
  | "labelDeActivateStyle"
  | "descriptionFontFamily"
  | "descriptionFontSize"
  | "descriptionLineHeight"
  | "descriptionFontWeight"
  | "descriptionTextColor"
  | "errorLabelFontFamily"
  | "errorLabelFontSize"
  | "errorLabelFontWeight"
  | "errorLabelLineHeight"
  | "errorLabelTextColor"
  | "isClearable"
>;

const BasicAutoCompleteWithIcon: React.FC<BasicAutoCompleteWithIconProps> = (
  props
) => {
  return (
    <AutoCompleteWithIconBase
      id={props.id}
      error={props.error}
      label={props.label}
      description={props.description}
      disabled={props.disabled}
      readOnly={props.readOnly}
      required={props.required}
      onChangeInput={props.onChangeInput}
      defaultValue={props.defaultValue}
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
      descriptionFontFamily="font-mono"
      descriptionFontSize="text-xs"
      descriptionLineHeight="leading-[15.6px]"
      descriptionFontWeight="font-normal"
      descriptionTextColor="text-instillGrey50"
      errorLabelFontFamily="font-sans"
      errorLabelFontSize="text-sm"
      errorLabelFontWeight="font-normal"
      errorLabelLineHeight="leading-[18.2px]"
      errorLabelTextColor="text-instillRed"
    />
  );
};

export default BasicAutoCompleteWithIcon;
