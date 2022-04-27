import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import BasicTextArea from "./BasicTextArea";

export default {
  title: "Components/Ui/Input/BasicTextArea",
  component: BasicTextArea,
} as ComponentMeta<typeof BasicTextArea>;

const Template: ComponentStory<typeof BasicTextArea> = (args) => {
  const [value, setValue] = useState<string>("");
  return (
    <BasicTextArea value={value} onChangeInput={(s) => setValue(s)} {...args} />
  );
};

export const Playground: ComponentStory<typeof BasicTextArea> = Template.bind(
  {}
);

Playground.args = {
  label: "Playground",
  description: "this is a description for basic textarea",
  error: null,
  value: null,
  id: "text-field-playground",
  required: true,
  autoComplete: "off",
  disabled: false,
  placeholder: "hello",
  readOnly: false,
};
