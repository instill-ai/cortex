import { ComponentStory, ComponentMeta } from "@storybook/react";
import { basicInputDescriptionConfig } from "../../InputDescriptions";
import UploadFileFieldBase from "./UploadFileFieldBase";

export default {
  title: "Components/Base/Input/UploadFileFieldBase",
  component: UploadFileFieldBase,
} as ComponentMeta<typeof UploadFileFieldBase>;

const Template: ComponentStory<typeof UploadFileFieldBase> = (args) => (
  <UploadFileFieldBase {...args} />
);

export const Playground: ComponentStory<typeof UploadFileFieldBase> =
  Template.bind({});

Playground.args = {
  required: true,
  focusHighlight: true,
  id: "upload-file-field-base-playground",
  onChangeInput: () => undefined,
  inputLabelType: "inset",
  placeholder: "playground",

  label: "playground",
  additionalMessageOnLabel: null,
  labelFontSize: "text-sm",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey50",
  labelLineHeight: "leading-[18.2px]",
  labelFontFamily: "font-sans",
  labelActivateStyle: "top-1/2 -translate-y-[120%]",
  labelDeActivateStyle: "top-1/2 -translate-y-1/2",

  error: "",
  errorInputBgColor: "bg-white",
  errorLabelFontFamily: "font-sans",
  errorLabelFontSize: "text-sm",
  errorLabelFontWeight: "font-normal",
  errorLabelLineHeight: "leading-[18.2px]",
  errorLabelTextColor: "text-instillRed",
  errorInputBorderColor: "border-instillRed",
  errorInputBorderWidth: "border",
  errorInputBorderStyle: "border-solid",
  errorInputTextColor: "text-instillRed",

  disabled: false,
  disabledInputBgColor: "bg-white",
  disabledInputBorderColor: "border-instillGrey20",
  disabledInputBorderStyle: "border-dashed",
  disabledInputBorderWidth: "border",
  disabledInputTextColor: "text-instillGrey50",

  readOnly: false,
  readOnlyInputBgColor: "bg-white",
  readOnlyInputBorderColor: "border-instillGrey20",
  readOnlyInputBorderStyle: "border-solid",
  readOnlyInputBorderWidth: "border",
  readOnlyInputTextColor: "text-instillGrey50",

  description: "this is a description about upload file field",
  ...basicInputDescriptionConfig,

  inputWidth: "w-full",
  inputHeight: "h-[70px]",
  inputFontSize: "text-base",
  inputTextColor: "text-instillGrey95",
  inputFontWeight: "font-normal",
  inputLineHeight: "leading-[28px]",
  inputBgColor: "bg-white",
  inputBorderRadiusBottomLeft: "rounded-bl-[1px]",
  inputBorderRadiusBottomRight: "rounded-br-[1px]",
  inputBorderRadiusTopLeft: "rounded-tl-[1px]",
  inputBorderRadiusTopRight: "rounded-tr-[1px]",
  inputBorderColor: "border-instillGrey20",
  inputBorderStyle: "border-solid",
  inputBorderWidth: "border",

  uploadButtonText: "Upload",
  uploadButtonBgColor: "bg-instillBlue10",
  uploadButtonTextColor: "text-instillBlue50",
  uploadButtonHoverBgColor: "group-hover:bg-instillBlue50",
  uploadButtonHoverTextColor: "group-hover:text-instillGrey05",
};
