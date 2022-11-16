import { ComponentStory, ComponentMeta } from "@storybook/react";
import MenuIcon from "./MenuIcon";

export default {
  title: "Components/Ui/Icon/MenuIcon",
  component: MenuIcon,
} as ComponentMeta<typeof MenuIcon>;

const Template: ComponentStory<typeof MenuIcon> = (args) => (
  <MenuIcon {...args} />
);

export const Playground: ComponentStory<typeof MenuIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
