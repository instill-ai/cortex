import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextAreaBase from "./TextAreaBase";

export default {
  title: "Components/Base/Input/TextAreaBase",
  component: TextAreaBase,
} as ComponentMeta<typeof TextAreaBase>;

const Template: ComponentStory<typeof TextAreaBase> = (args) => (
  <TextAreaBase {...args} />
);

export const Playground: ComponentStory<typeof TextAreaBase> = Template.bind(
  {}
);

Playground.args = {
  error: null,
  id: "text-field-playground",
  labelName: "playground",
  required: true,
  inputHeight: "h-[140px]",
  inputWidth: "w-full",
  focusHighlight: true,
  autoComplete: "off",
  inputFontSize: "text-base",
  inputFontWeight: "font-normal",
  inputLineHeight: "leading-[28px]",
  inputTextColor: "text-instillGray95",
  disabled: false,
  placeholder: "hello",
  readOnly: false,
  resize: "both",
  inputLabelType: "inset",
  bgColor: "bg-white",
  inputBorderRadius: "rounded-[1px]",
  inputBorderColor: "border-instillGray20",
  inputBorderStyle: "border-solid",
  inputBorderWidth: "border",
  disabledCursor: "disabled:cursor-not-allowed",
  disabledInputBgColor: "disabled:bg-white",
  disabledInputBorderColor: "disabled:border-instillGray20",
  disabledInputBorderStyle: "disabled:border-dashed",
  disabledInputBorderWidth: "disabled:border",
  disabledInputTextColor: "disabled:text-instillGray50",
  readOnlyCursor: "read-only:cursor-auto",
  readOnlyInputBgColor: "read-only:bg-white",
  readOnlyInputBorderColor: "read-only:border-instillGray20",
  readOnlyInputBorderStyle: "read-only:border-solid",
  readOnlyInputBorderWidth: "read-only:border",
  readOnlyInputTextColor: "read-only:text-instillGray95",
  placeholderFontFamily: "placeholder:font-sans",
  placeholderFontSize: "placeholder:text-base",
  placeholderFontWeight: "placeholder:font-normal",
  placeholderLineHeight: "placeholder:leading-[28px]",
  placeholderTextColor: "placeholder:text-instillGray95",
};

export const Default: ComponentStory<typeof TextAreaBase> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <TextAreaBase
      error={null}
      onChangeInput={onChangeInput}
      id="text-field-playground"
      labelName="playground"
      required={true}
      inputHeight={"h-[140px]"}
      inputWidth={"w-full"}
      focusHighlight={true}
      autoComplete="off"
      inputFontSize="text-base"
      inputFontWeight="font-normal"
      inputLineHeight="leading-[28px]"
      inputTextColor="text-instillGray95"
      disabled={false}
      placeholder="hello"
      readOnly={false}
      resize="both"
      inputLabelType="inset"
      bgColor="bg-white"
      inputBorderRadius="rounded-[1px]"
      inputBorderColor="border-instillGray20"
      inputBorderStyle="border-solid"
      inputBorderWidth="border"
      disabledCursor="disabled:cursor-not-allowed"
      disabledInputBgColor="disabled:bg-white"
      disabledInputBorderColor="disabled:border-instillGray20"
      disabledInputBorderStyle="disabled:border-dashed"
      disabledInputBorderWidth="disabled:border"
      disabledInputTextColor="disabled:text-instillGray50"
      readOnlyCursor="read-only:cursor-auto"
      readOnlyInputBgColor="read-only:bg-white"
      readOnlyInputBorderColor="read-only:border-instillGray20"
      readOnlyInputBorderStyle="read-only:border-solid"
      readOnlyInputBorderWidth="read-only:border"
      readOnlyInputTextColor="read-only:text-instillGray95"
      placeholderFontFamily="placeholder:font-sans"
      placeholderFontSize="placeholder:text-base"
      placeholderFontWeight="placeholder:font-normal"
      placeholderLineHeight="placeholder:leading-[28px]"
      placeholderTextColor="placeholder:text-instillGray95"
    />
  );
};
