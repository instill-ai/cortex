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
      fontSize="text-base"
      lineHeight="leading-[28px]"
      fontWeight="font-normal"
      bgColor="bg-white"
      textColor="text-instillGray95"
      disabled={false}
      placeholder="hello"
      readOnly={false}
      enableProtectedToggle={false}
    />
  );
};
