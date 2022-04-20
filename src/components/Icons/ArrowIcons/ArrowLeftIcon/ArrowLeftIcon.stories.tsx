import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArrowLeftIcon from "./ArrowLeftIcon";

export default {
  title: "Components/Ui/Icon/ArrowLeftIcon",
  component: ArrowLeftIcon,
} as ComponentMeta<typeof ArrowLeftIcon>;

const Template: ComponentStory<typeof ArrowLeftIcon> = (args) => (
  <ArrowLeftIcon {...args} />
);

export const Playground: ComponentStory<typeof ArrowLeftIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
