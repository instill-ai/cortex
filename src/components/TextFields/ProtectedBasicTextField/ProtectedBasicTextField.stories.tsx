import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProtectedBasicTextField from "./ProtectedBasicTextField";

export default {
  title: "Components/Ui/Input/ProtectedBasicTextField",
  component: ProtectedBasicTextField,
} as ComponentMeta<typeof ProtectedBasicTextField>;

const Template: ComponentStory<typeof ProtectedBasicTextField> = (args) => (
  <ProtectedBasicTextField {...args} />
);

export const Playground: ComponentStory<typeof ProtectedBasicTextField> =
  Template.bind({});

Playground.args = {
  error: null,
  id: "protected-text-field-playground",
  label: "protected-text-field-playground",
  description: "this is a description for protected text field",
  required: true,
  autoComplete: "off",
  disabled: false,
  placeholder: "hello!",
  readOnly: false,
  additionalMessageOnLabel: null,
};
