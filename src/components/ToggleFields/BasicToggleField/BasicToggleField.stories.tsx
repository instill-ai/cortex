import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicToggleField from "./BasicToggleField";

export default {
  title: "Components/Ui/Input/BasicToggleField",
  component: BasicToggleField,
} as ComponentMeta<typeof BasicToggleField>;

const Template: ComponentStory<typeof BasicToggleField> = (args) => (
  <BasicToggleField {...args} />
);
export const Playground: ComponentStory<typeof BasicToggleField> =
  Template.bind({});

Playground.args = {
  id: "basic-toggle-field",
  defaultChecked: false,
  disabled: false,
  readOnly: false,
  required: true,
  labelName: "basic-toggle-field",
};
