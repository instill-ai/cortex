import { ComponentStory, ComponentMeta } from "@storybook/react";
import GitTagIcon from "./GitTagIcon";

export default {
  title: "Components/Ui/Icon/GitTagIcon",
  component: GitTagIcon,
} as ComponentMeta<typeof GitTagIcon>;

const Template: ComponentStory<typeof GitTagIcon> = (args) => (
  <GitTagIcon {...args} />
);

export const Playground: ComponentStory<typeof GitTagIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
