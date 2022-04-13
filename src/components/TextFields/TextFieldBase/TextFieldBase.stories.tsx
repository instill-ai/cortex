import React, { ChangeEvent, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextFieldBase from "./TextFieldBase";

export default {
  title: "Components/Base/Input/TextFieldBase",
  component: TextFieldBase,
} as ComponentMeta<typeof TextFieldBase>;

const Template: ComponentStory<typeof TextFieldBase> = (args) => (
  <TextFieldBase {...args} />
);

export const Playground: ComponentStory<typeof TextFieldBase> = Template.bind(
  {}
);

Playground.args = {
  error: null,
  id: "text-field-playground",
  labelName: "playground",
  required: true,
  inputHeight: "h-[70px]",
  inputWidth: "w-full",
  focusHighlight: false,
  autoComplete: "off",
  type: "text",
  inputFontSize: "text-base",
  inputLineHeight: "leading-[28px]",
  inputFontWeight: "font-normal",
  inputTextColor: "text-instillGray95",
  bgColor: "bg-white",
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
  disabled: false,
  placeholder: "hello",
  readOnly: false,
  enableProtectedToggle: false,
  inputLabelType: "inset",
  inputBorderRadius: "rounded-[1px]",
  inputBorderColor: "border-instillGray20",
  inputBorderStyle: "border-dashed",
  inputBorderWidth: "border-4",
};

export const Default: ComponentStory<typeof TextFieldBase> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <TextFieldBase
      error={null}
      onChangeInput={onChangeInput}
      id="text-field-playground"
      labelName="playground"
      required={true}
      inputHeight="h-[70px]"
      inputWidth="w-full"
      focusHighlight={true}
      autoComplete="off"
      type="text"
      inputFontSize="text-base"
      inputLineHeight="leading-[28px]"
      inputFontWeight="font-normal"
      inputTextColor="text-instillGray95"
      bgColor="bg-white"
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
      disabled={false}
      placeholder="hello"
      readOnly={false}
      enableProtectedToggle={false}
      inputLabelType="inset"
      inputBorderRadius="rounded-[1px]"
      inputBorderColor="border-instillGray20"
      inputBorderStyle="border-solid"
      inputBorderWidth="border"
    />
  );
};
