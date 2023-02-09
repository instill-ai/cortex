import { Meta, StoryFn } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { NormalLabelTextArea } from "./NormalLabelTextArea";

const meta: Meta<typeof NormalLabelTextArea> = {
  title: "Components/Ui/Input/NormalLabelTextArea",
  component: NormalLabelTextArea,
};

export default meta;

const Template: StoryFn<typeof NormalLabelTextArea> = (args) => {
  const [value, setValue] = useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <NormalLabelTextArea
      {...args}
      id="text-field-playground"
      label="Playground"
      placeholder="hello"
      description="this is a description for basic textarea <a href='#'>setup guide</a>"
      autoComplete="off"
      onChange={onChange}
      value={value}
    />
  );
};

export const Playground: StoryFn<typeof NormalLabelTextArea> = Template.bind(
  {}
);

Playground.args = {
  required: true,
  disabled: false,
  readOnly: false,
  additionalMessageOnLabel: "text label",
};
