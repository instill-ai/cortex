import { Meta, StoryFn } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { BasicProtectedTextField } from "./BasicProtectedTextField";

const meta: Meta<typeof BasicProtectedTextField> = {
  title: "Components/Ui/Input/BasicProtectedTextField",
  component: BasicProtectedTextField,
};

export default meta;

const Template: StoryFn<typeof BasicProtectedTextField> = (args) => {
  const [value, setValue] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <BasicProtectedTextField
      {...args}
      id="protected-text-field-playground"
      label="protected-text-field-playground"
      description="this is a description for protected text field <a href='#'>setup guide</a>"
      value={value}
      onChange={onChange}
    />
  );
};

export const Playground: StoryFn<typeof BasicProtectedTextField> =
  Template.bind({});

Playground.args = {
  required: true,
  disabled: false,
  readOnly: false,
  additionalMessageOnLabel: "text label",
};
