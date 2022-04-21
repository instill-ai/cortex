import { ComponentStory, ComponentMeta } from "@storybook/react";
import UploadFileFieldBase from "./UploadFileFieldBase";

export default {
  title: "Components/Base/Input/UploadFileFieldBase",
  component: UploadFileFieldBase,
} as ComponentMeta<typeof UploadFileFieldBase>;

const Template: ComponentStory<typeof UploadFileFieldBase> = () => (
  <UploadFileFieldBase
    id="upload-file-field-base-playground"
    error=""
    onChangeInput={() => undefined}
    disabled={false}
    readOnly={false}
    required={true}
    label="upload-file-field-base-playground"
    focusHighlight={true}
    inputWidth="w-full"
    inputHeight="h-[70px]"
    inputFontSize="text-base"
    inputTextColor="text-instillGrey95"
    inputFontWeight="font-normal"
    inputLineHeight="leading-[28px]"
    placeholder="playground"
    inputLabelType="inset"
    uploadButtonText="Upload"
    uploadButtonBgColor="bg-instillGrey50"
    uploadButtonTextColor="text-instillGrey05"
    inputBorderRadiusBottomLeft="rounded-bl-[1px]"
    inputBorderRadiusBottomRight="rounded-br-[1px]"
    inputBorderRadiusTopLeft="rounded-tl-[1px]"
    inputBorderRadiusTopRight="rounded-tr-[1px]"
    inputBorderColor="border-instillGrey20"
    inputBorderStyle="border-solid"
    inputBorderWidth="border"
    description="this is a description about upload file field"
    labelFontSize="text-sm"
    labelFontWeight="font-normal"
    labelTextColor="text-instillGrey50"
    labelLineHeight="leading-[18.2px]"
    labelFontFamily="font-sans"
    labelActivateStyle="top-1/2 -translate-y-[120%]"
    labelDeActivateStyle="top-1/2 -translate-y-1/2"
  />
);

export const Playground: ComponentStory<typeof UploadFileFieldBase> =
  Template.bind({});
