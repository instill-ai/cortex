import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicTextField from "./BasicTextField";

export default {
  title: "Components/Ui/Input/BasicTextField",
  component: BasicTextField,
} as ComponentMeta<typeof BasicTextField>;

const Template: ComponentStory<typeof BasicTextField> = (args) => (
  <BasicTextField {...args} />
);

export const Playground: ComponentStory<typeof BasicTextField> = Template.bind(
  {}
);

Playground.args = {
  labelName: "basic-text-field-playground",
};

export const Default: ComponentStory<typeof BasicTextField> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <BasicTextField
      error={null}
      onChangeInput={onChangeInput}
      id="basic-text-field-playground"
      labelName="basic-text-field-playground"
      required={true}
      autoComplete="off"
      type="text"
      disabled={false}
      placeholder="hello!"
      readOnly={false}
    />
  );
};
