import { ComponentStory, ComponentMeta } from "@storybook/react";
import UploadFileFieldBase from "./UploadFileFieldBase";

export default {
  title: "Components/Base/Input/UploadFileFieldBase",
  component: UploadFileFieldBase,
} as ComponentMeta<typeof UploadFileFieldBase>;

const Template: ComponentStory<typeof UploadFileFieldBase> = (args) => (
  <UploadFileFieldBase
    id="upload-file-field-base-playground"
    disabled={false}
    readOnly={false}
    required={true}
    labelName="upload-file-field-base-playground"
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
    {...args}
  />
);
export const Playground: ComponentStory<typeof UploadFileFieldBase> =
  Template.bind({});
