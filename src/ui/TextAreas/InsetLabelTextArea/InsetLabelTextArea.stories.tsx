import { Meta, StoryFn } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { InsetLabelTextArea } from "./InsetLabelTextArea";

const meta: Meta<typeof InsetLabelTextArea> = {
  title: "Components/Ui/Input/InsetLabelTextArea",
  component: InsetLabelTextArea,
};

export default meta;

const Template: StoryFn<typeof InsetLabelTextArea> = (args) => {
  const [value, setValue] = useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <InsetLabelTextArea
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

export const Playground: StoryFn<typeof InsetLabelTextArea> = Template.bind({});

Playground.args = {
  required: true,
  disabled: false,
  readOnly: false,
  additionalMessageOnLabel: "text label",
};
