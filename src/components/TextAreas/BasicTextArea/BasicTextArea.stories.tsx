import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BasicTextArea } from "./BasicTextArea";

export default {
  title: "Components/Ui/Input/BasicTextArea",
  component: BasicTextArea,
} as ComponentMeta<typeof BasicTextArea>;

const Template: ComponentStory<typeof BasicTextArea> = (args) => (
  <BasicTextArea {...args} />
);

export const Playground: ComponentStory<typeof BasicTextArea> = Template.bind(
  {}
);

Playground.args = {
  labelName: "Playground",
};

export const Default: ComponentStory<typeof BasicTextArea> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <BasicTextArea
      valid={text ? true : false}
      onChangeInput={onChangeInput}
      id="text-field-playground"
      labelName="playground"
      required={true}
      autoComplete="off"
      disabled={false}
      placeholder="hello"
      readOnly={false}
      resize="both"
    />
  );
};
