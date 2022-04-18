import React from "react";
import UploadFileFieldBase, {
  UploadFileFieldBaseProps,
} from "../UploadFileFieldBase/UploadFileFieldBase";

export type BasicUploadFileFieldProps = Omit<
  UploadFileFieldBaseProps,
  | "uploadButtonBgColor"
  | "uploadButtonTextColor"
  | "inputBorderRadiusBottomLeft"
  | "inputBorderRadiusBottomRight"
  | "inputBorderRadiusTopLeft"
  | "inputBorderRadiusTopRight"
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
>;

const BasicUploadFileField: React.FC<BasicUploadFileFieldProps> = (props) => {
  return (
    <UploadFileFieldBase
      error={props.error}
      id={props.id}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChangeInput={props.onChangeInput}
      required={props.required}
      placeholder={props.placeholder}
      labelName={props.labelName}
      uploadButtonText={props.uploadButtonText}
      uploadButtonBgColor="bg-instillGray50"
      uploadButtonTextColor="text-instillGray05"
      inputBorderRadiusBottomLeft="rounded-bl-[1px]"
      inputBorderRadiusBottomRight="rounded-br-[1px]"
      inputBorderRadiusTopLeft="rounded-tl-[1px]"
      inputBorderRadiusTopRight="rounded-tr-[1px]"
      inputFontSize="text-base"
      inputFontWeight="font-normal"
      inputLineHeight="leading-[28px]"
      inputTextColor="text-instillGray95"
      inputWidth="w-full"
      inputHeight="h-[70px]"
      focusHighlight={true}
      inputLabelType="inset"
      inputBorderColor="border-instillGray20"
      inputBorderStyle="border-solid"
      inputBorderWidth="border"
    />
  );
};

export default BasicUploadFileField;
