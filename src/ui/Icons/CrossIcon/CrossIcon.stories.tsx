import { ComponentStory, ComponentMeta } from "@storybook/react";
import CrossIcon from "./CrossIcon";

export default {
  title: "Components/Ui/Icon/CrossIcon",
  component: CrossIcon,
} as ComponentMeta<typeof CrossIcon>;

const Template: ComponentStory<typeof CrossIcon> = (args) => (
  <CrossIcon {...args} />
);

export const Playground: ComponentStory<typeof CrossIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
