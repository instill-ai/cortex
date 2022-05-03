import { ComponentStory, ComponentMeta } from "@storybook/react";
import GearIcon from "./GitHubIcon";

export default {
  title: "Components/Ui/Icon/GearIcon",
  component: GearIcon,
} as ComponentMeta<typeof GearIcon>;

const Template: ComponentStory<typeof GearIcon> = (args) => (
  <GearIcon {...args} />
);

export const Playground: ComponentStory<typeof GearIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
