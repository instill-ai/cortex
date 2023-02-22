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
  | "errorLabelFontFamily"
  | "errorLabelFontSize"
  | "errorLabelFontWeight"
  | "errorLabelLineHeight"
  | "errorLabelTextColor"
  | "messageFontFamily"
  | "messageFontSize"
  | "messageFontWeight"
  | "messageLineHeight"
  | "messageTextColor";

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
  labelFontSize: "text-base",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey90",
  labelLineHeight: "",
  labelFontFamily: "font-sans",
  errorLabelFontFamily: "font-sans",
  errorLabelFontSize: "text-base",
  errorLabelFontWeight: "font-normal",
  errorLabelLineHeight: "",
  errorLabelTextColor: "text-instillRed",
  messageFontSize: "text-xs",
  messageTextColor: "text-instillGrey70",
  messageFontFamily: "font-sans",
  messageFontWeight: "font-normal",
  messageLineHeight: "",
};

export type BasicSingleSelectProps = BasicSingleSelectRequiredProps &
  BasicSingleSelectOptionalProps;

export const BasicSingleSelect: React.FC<BasicSingleSelectProps> = (props) => {
  const {
    id,
    instanceId,
    onChange,
    value,
    options,
    label,
    onFocus,
    onBlur,
    additionalMessageOnLabel,
    menuPlacement,
    description,
    error,
    disabled,
    readOnly,
    required,
    isClearable,
    inputLabelType,
  } = props;

  return (
    <SingleSelectBase
      id={id}
      inputLabelType={inputLabelType || "normal"}
      instanceId={instanceId}
      onChange={onChange}
      value={value}
      options={options}
      label={label}
      onFocus={onFocus ?? null}
      onBlur={onBlur ?? null}
      additionalMessageOnLabel={additionalMessageOnLabel ?? null}
      menuPlacement={menuPlacement ?? "auto"}
      description={description ?? ""}
      error={error ?? null}
      disabled={disabled ?? false}
      readOnly={readOnly ?? false}
      required={required ?? false}
      isClearable={isClearable ?? false}
      {...basicInputDescriptionConfig}
      {...basicSingleSelectConfig}
    />
  );
};
