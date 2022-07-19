import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import BasicToggleField from "./BasicToggleField";

export default {
  title: "Components/Ui/Input/BasicToggleField",
  component: BasicToggleField,
} as ComponentMeta<typeof BasicToggleField>;

const Template: ComponentStory<typeof BasicToggleField> = (args) => {
  const [checked, setChecked] = useState(false);

  const onChangeInput = (_: string, value: boolean) => setChecked(value);

  return (
    <BasicToggleField
      {...args}
      id="basic-toggle-field"
      onChangeInput={onChangeInput}
      description="this is a description for basic toggle field <a href='#'>setup guide</a>"
      label="basic-toggle-field"
      value={checked}
    />
  );
};
export const Playground: ComponentStory<typeof BasicToggleField> =
  Template.bind({});

Playground.args = {
  disabled: false,
  readOnly: false,
  required: true,
  additionalMessageOnLabel: null,
};
