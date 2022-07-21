import { ComponentStory, ComponentMeta } from "@storybook/react";
import OutlineButton from "./OutlineButton";

export default {
  title: "Components/Ui/Button/OutlineButton",
  component: OutlineButton,
} as ComponentMeta<typeof OutlineButton>;

const Template: ComponentStory<typeof OutlineButton> = (args) => (
  <OutlineButton {...args}>Button</OutlineButton>
);
export const Playground: ComponentStory<typeof OutlineButton> = Template.bind(
  {}
);

Playground.args = {
  variant: "primary",
};
