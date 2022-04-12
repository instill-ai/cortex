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
  labelName: "Playground",
};

export const Default: ComponentStory<typeof TextAreaBase> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <TextAreaBase
      error={false}
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
      disabledBgColor="bg-white"
      readOnlyBgColor="bg-white"
      bgColor="bg-white"
      borderRadius="rounded"
    />
  );
};
