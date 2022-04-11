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
  labelName: "Playground",
};

export const Default: ComponentStory<typeof TextFieldBase> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <TextFieldBase
      valid={text ? true : false}
      onChangeInput={onChangeInput}
      id="text-field-playground"
      labelName="playground"
      required={true}
      inputHeight={"h-[70px]"}
      inputWidth={"w-full"}
      focusHighlight={false}
      autoComplete="off"
      type="text"
      inputFontSize="text-base"
      inputLineHeight="leading-[28px]"
      inputFontWeight="font-normal"
      inputTextColor="text-instillGray95"
      bgColor="bg-white"
      disabledBgColor="disabled:bg-white"
      readOnlyBgColor="bg-white"
      disabled={false}
      placeholder="hello"
      readOnly={false}
      enableProtectedToggle={false}
      inputLabelType="inset"
      borderRadius="rounded"
    />
  );
};
