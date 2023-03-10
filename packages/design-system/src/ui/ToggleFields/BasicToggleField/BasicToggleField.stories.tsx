import { Meta, StoryFn } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import BasicToggleField from "./BasicToggleField";

const meta: Meta<typeof BasicToggleField> = {
  title: "Components/Ui/Input/BasicToggleField",
  component: BasicToggleField,
};

export default meta;

const Template: StoryFn<typeof BasicToggleField> = (args) => {
  const [checked, setChecked] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setChecked(event.target.checked);

  return (
    <BasicToggleField
      {...args}
      id="basic-toggle-field"
      onChange={onChange}
      description="this is a description for basic toggle field <a href='#'>setup guide</a>"
      label="basic-toggle-field"
      value={checked}
    />
  );
};
export const Playground: StoryFn<typeof BasicToggleField> = Template.bind({});

Playground.args = {
  disabled: false,
  readOnly: false,
  required: true,
  additionalMessageOnLabel: "text label",
};
