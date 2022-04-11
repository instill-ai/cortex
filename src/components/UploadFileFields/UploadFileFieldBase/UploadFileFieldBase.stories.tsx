import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import UploadFileFieldBase from "./UploadFileFieldBase";

export default {
  title: "Components/Base/Input/UploadFileFieldBase",
  component: UploadFileFieldBase,
} as ComponentMeta<typeof UploadFileFieldBase>;

const Template: ComponentStory<typeof UploadFileFieldBase> = (args) => (
  <UploadFileFieldBase
    uploadButtonText="Upload"
    uploadButtonBgColor="bg-instillGray50"
    uploadButtonTextColor="text-instillGray05"
    labelName="playground"
    borderRadiusBottomLeft="rounded-bl-[1px]"
    borderRadiusBottomRight="rounded-br-[1px]"
    borderRadiusTopLeft="rounded-tl-[1px]"
    borderRadiusTopRight="rounded-tr-[1px]"
    inputHeight="h-[70px]"
    inputWidth="w-full"
    {...args}
  />
);
export const Playground: ComponentStory<typeof UploadFileFieldBase> =
  Template.bind({});

export const Default: ComponentStory<typeof UploadFileFieldBase> = () => {
  const [file, setFile] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setFile(inputValue);
  };

  return (
    <UploadFileFieldBase
      id="upload-file-field-base-playground"
      disabled={false}
      readOnly={false}
      onChangeInput={onChangeInput}
      required={true}
      labelName="upload-file-field-base-playground"
      focusHighlight={true}
      inputWidth="w-full"
      inputHeight="h-[70px]"
      inputFontSize="text-base"
      inputTextColor="text-instillGray95"
      inputFontWeight="font-normal"
      inputLineHeight="leading-[28px]"
      placeholder="playground"
      inputLabelType="inset"
      uploadButtonText="Upload"
      uploadButtonBgColor="bg-instillGray50"
      uploadButtonTextColor="text-instillGray05"
      borderRadiusBottomLeft="rounded-bl-[1px]"
      borderRadiusBottomRight="rounded-br-[1px]"
      borderRadiusTopLeft="rounded-tl-[1px]"
      borderRadiusTopRight="rounded-tr-[1px]"
    />
  );
};
