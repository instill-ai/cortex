import { ComponentStory, ComponentMeta } from "@storybook/react";
import SolidButton from "./SolidButton";

export default {
  title: "Components/Ui/Button/SolidButton",
  component: SolidButton,
} as ComponentMeta<typeof SolidButton>;

const Template: ComponentStory<typeof SolidButton> = (args) => (
  <SolidButton {...args}>Button</SolidButton>
);
export const Playground: ComponentStory<typeof SolidButton> = Template.bind({});

Playground.args = {
  color: "primary",
};
