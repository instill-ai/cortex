import { Meta, StoryFn } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { BasicTextField } from "./BasicTextField";

const meta: Meta<typeof BasicTextField> = {
  title: "Components/Ui/Input/BasicTextField",
  component: BasicTextField,
};

export default meta;

const Template: StoryFn<typeof BasicTextField> = (args) => {
  const [value, setValue] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <BasicTextField
      {...args}
      id="text-field-playground"
      label="text-field-playground"
      description="this is a description for text field <a href='#'>setup guide</a>"
      value={value}
      onChange={onChange}
    />
  );
};

export const Playground: StoryFn<typeof BasicTextField> = Template.bind({});

Playground.args = {
  required: true,
  disabled: false,
  readOnly: false,
  autoComplete: "off",
  additionalMessageOnLabel: "text label",
};
