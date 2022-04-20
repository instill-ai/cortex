import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArrowRightIcon from "./ArrowRightIcon";

export default {
  title: "Components/Ui/Icon/ArrowRightIcon",
  component: ArrowRightIcon,
} as ComponentMeta<typeof ArrowRightIcon>;

const Template: ComponentStory<typeof ArrowRightIcon> = (args) => (
  <ArrowRightIcon {...args} />
);

export const Playground: ComponentStory<typeof ArrowRightIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
