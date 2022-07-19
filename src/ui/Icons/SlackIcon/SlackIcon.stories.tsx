import { ComponentStory, ComponentMeta } from "@storybook/react";
import SlackIcon from "./SlackIcon";

export default {
  title: "Components/Ui/Icon/SlackIcon",
  component: SlackIcon,
} as ComponentMeta<typeof SlackIcon>;

const Template: ComponentStory<typeof SlackIcon> = (args) => (
  <SlackIcon {...args} />
);

export const Playground: ComponentStory<typeof SlackIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
