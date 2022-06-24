import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicToggleField from "./BasicToggleField";

export default {
  title: "Components/Ui/Input/BasicToggleField",
  component: BasicToggleField,
} as ComponentMeta<typeof BasicToggleField>;

const Template: ComponentStory<typeof BasicToggleField> = (args) => (
  <BasicToggleField
    {...args}
    id="basic-toggle-field"
    onChangeInput={() => undefined}
    description="this is a description for basic toggle field"
    label="basic-toggle-field"
  />
);
export const Playground: ComponentStory<typeof BasicToggleField> =
  Template.bind({});

Playground.args = {
  defaultChecked: false,
  disabled: false,
  readOnly: false,
  required: true,
  additionalMessageOnLabel: null,
};
