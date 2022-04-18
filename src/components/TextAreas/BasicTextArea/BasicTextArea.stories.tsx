import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicTextArea from "./BasicTextArea";

export default {
  title: "Components/Ui/Input/BasicTextArea",
  component: BasicTextArea,
} as ComponentMeta<typeof BasicTextArea>;

const Template: ComponentStory<typeof BasicTextArea> = (args) => (
  <BasicTextArea {...args} />
);

export const Playground: ComponentStory<typeof BasicTextArea> = Template.bind(
  {}
);

Playground.args = {
  labelName: "Playground",
  error: null,
  value: null,
  id: "text-field-playground",
  required: true,
  autoComplete: "off",
  disabled: false,
  placeholder: "hello",
  readOnly: false,
};
