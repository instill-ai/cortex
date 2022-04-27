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
  id: "basic-text-field-playground",
  label: "basic-text-field-playground",
  description: "this is a description for basic text field",
  error: null,
  required: true,
  autoComplete: "off",
  type: "text",
  disabled: false,
  placeholder: "hello!",
  readOnly: false,
};
