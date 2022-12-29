import React from "react";
import {
  basicInputDescriptionConfig,
  BasicInputDescriptionOmitKeys,
} from "../../InputDescriptions";
import UploadFileFieldBase, {
  UploadFileFieldBaseProps,
} from "../UploadFileFieldBase";

export type BasicUploadFileFieldRequiredKeys =
  | "id"
  | "onChange"
  | "label"
  | "uploadButtonText";

export type BasicUploadFileFieldOmitKeys =
  | "uploadButtonFontSize"
  | "uploadButtonFontWeight"
  | "uploadButtonBgColor"
  | "uploadButtonTextColor"
  | "uploadButtonHoverBgColor"
  | "uploadButtonHoverTextColor"
  | "inputBorderRadiusBottomLeft"
  | "inputBorderRadiusBottomRight"
  | "inputBorderRadiusTopLeft"
  | "inputBorderRadiusTopRight"
  | "inputBgColor"
  | "inputFontSize"
  | "inputFontWeight"
  | "inputLineHeight"
  | "inputTextColor"
  | "inputWidth"
  | "inputHeight"
  | "focusHighlight"
  | "inputLabelType"
  | "inputBorderColor"
  | "inputBorderStyle"
  | "inputBorderWidth"
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
  | "errorInputBorderColor"
  | "errorInputBorderWidth"
  | "errorInputBorderStyle"
  | "errorInputTextColor"
  | "errorInputBgColor"
  | "disabledInputBgColor"
  | "disabledInputBorderColor"
  | "disabledInputBorderStyle"
  | "disabledInputBorderWidth"
  | "disabledInputTextColor"
  | "readOnlyInputBgColor"
  | "readOnlyInputBorderColor"
  | "readOnlyInputBorderStyle"
  | "readOnlyInputBorderWidth"
  | "readOnlyInputTextColor";

export type FullBasicUploadFileFieldProps = Omit<
  UploadFileFieldBaseProps,
  BasicUploadFileFieldOmitKeys | BasicInputDescriptionOmitKeys
>;

export type BasicUploadFileFieldRequiredProps = Pick<
  FullBasicUploadFileFieldProps,
  BasicUploadFileFieldRequiredKeys
>;

export type BasicUploadFileFieldOptionalProps = Partial<
  Omit<FullBasicUploadFileFieldProps, BasicUploadFileFieldRequiredKeys>
>;

export type BasicUploadFileFieldConfig = Pick<
  UploadFileFieldBaseProps,
  BasicUploadFileFieldOmitKeys
>;

export type BasicUploadFileFieldProps = BasicUploadFileFieldOptionalProps &
  BasicUploadFileFieldRequiredProps;

export const basicUploadFileFieldConfig: BasicUploadFileFieldConfig = {
  uploadButtonFontSize: "text-sm",
  uploadButtonFontWeight: "font-normal",
  uploadButtonBgColor: "bg-instillBlue10",
  uploadButtonTextColor: "text-instillBlue50",
  uploadButtonHoverBgColor: "group-hover:bg-instillBlue50",
  uploadButtonHoverTextColor: "group-hover:text-instillGrey05",
  inputBorderRadiusBottomLeft: "rounded-bl-[1px]",
  inputBorderRadiusBottomRight: "rounded-br-[1px]",
  inputBorderRadiusTopLeft: "rounded-tl-[1px]",
  inputBorderRadiusTopRight: "rounded-tr-[1px]",
  inputBgColor: "bg-white",
  inputFontSize: "text-base",
  inputFontWeight: "font-normal",
  inputLineHeight: "leading-[28px]",
  inputTextColor: "text-instillGrey95",
  inputWidth: "w-full",
  inputHeight: "h-[70px]",
  focusHighlight: true,
  inputLabelType: "inset",
  inputBorderColor: "border-instillGrey20",
  inputBorderStyle: "border-solid",
  inputBorderWidth: "border",
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
  errorInputBorderColor: "border-instillRed",
  errorInputBorderWidth: "border",
  errorInputBorderStyle: "border-solid",
  errorInputTextColor: "text-instillRed",
  errorInputBgColor: "bg-white",
  disabledInputBgColor: "bg-white",
  disabledInputBorderColor: "border-instillGrey20",
  disabledInputBorderStyle: "border-dashed",
  disabledInputBorderWidth: "border",
  disabledInputTextColor: "text-instillGrey50",
  readOnlyInputBgColor: "bg-white",
  readOnlyInputBorderColor: "border-instillGrey20",
  readOnlyInputBorderStyle: "border-solid",
  readOnlyInputBorderWidth: "border",
  readOnlyInputTextColor: "text-instillGrey50",
};

const BasicUploadFileField: React.FC<BasicUploadFileFieldProps> = (props) => {
  const {
    id,
    label,
    onChange,
    uploadButtonText,
    additionalMessageOnLabel,
    error,
    description,
    disabled,
    readOnly,
    required,
    placeholder,
    ...passThrough
  } = props;

  return (
    <UploadFileFieldBase
      {...passThrough}
      id={id}
      label={label}
      onChange={onChange}
      uploadButtonText={uploadButtonText}
      additionalMessageOnLabel={additionalMessageOnLabel ?? null}
      error={error ?? null}
      description={description ?? ""}
      disabled={disabled ?? false}
      readOnly={readOnly ?? false}
      required={required ?? false}
      placeholder={placeholder ?? ""}
      {...basicUploadFileFieldConfig}
      {...basicInputDescriptionConfig}
    />
  );
};

export default BasicUploadFileField;
