import { ComponentStory, ComponentMeta } from "@storybook/react";
import TwitterIcon from "./TwitterIcon";

export default {
  title: "Components/Ui/Icon/TwitterIcon",
  component: TwitterIcon,
} as ComponentMeta<typeof TwitterIcon>;

const Template: ComponentStory<typeof TwitterIcon> = (args) => (
  <TwitterIcon {...args} />
);

export const Playground: ComponentStory<typeof TwitterIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
