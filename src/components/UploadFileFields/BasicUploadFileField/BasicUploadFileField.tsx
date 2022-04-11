import { FC } from "react";
import UploadFileFieldBase, {
  UploadFileFieldBaseProps,
} from "../UploadFileFieldBase/UploadFileFieldBase";

export type BasicUploadFileFieldProps = Omit<
  UploadFileFieldBaseProps,
  | "uploadButtonBgColor"
  | "uploadButtonTextColor"
  | "borderRadiusBottomLeft"
  | "borderRadiusBottomRight"
  | "borderRadiusTopLeft"
  | "borderRadiusTopRight"
  | "inputFontSize"
  | "inputFontWeight"
  | "inputLineHeight"
  | "inputTextColor"
  | "inputWidth"
  | "inputHeight"
  | "focusHighlight"
  | "inputLabelType"
>;

const BasicUploadFileField: FC<BasicUploadFileFieldProps> = (props) => {
  return (
    <UploadFileFieldBase
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
      borderRadiusBottomLeft="rounded-bl-[1px]"
      borderRadiusBottomRight="rounded-br-[1px]"
      borderRadiusTopLeft="rounded-tl-[1px]"
      borderRadiusTopRight="rounded-tr-[1px]"
      inputFontSize="text-base"
      inputFontWeight="font-normal"
      inputLineHeight="leading-[28px]"
      inputTextColor="text-instillGray95"
      inputWidth="w-full"
      inputHeight="h-[70px]"
      focusHighlight={true}
      inputLabelType="inset"
    />
  );
};

export default BasicUploadFileField;
