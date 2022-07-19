import { ComponentStory, ComponentMeta } from "@storybook/react";
import DiscordIcon from "./DiscordIcon";

export default {
  title: "Components/Ui/Icon/DiscordIcon",
  component: DiscordIcon,
} as ComponentMeta<typeof DiscordIcon>;

const Template: ComponentStory<typeof DiscordIcon> = (args) => (
  <DiscordIcon {...args} />
);

export const Playground: ComponentStory<typeof DiscordIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
