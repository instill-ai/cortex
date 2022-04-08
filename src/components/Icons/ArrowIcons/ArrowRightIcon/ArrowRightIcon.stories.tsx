import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArrowRightIcon from "./ArrowRightIcon";

export default {
  title: "Components/Ui/Icon/ArrowRightIcon",
  component: ArrowRightIcon,
} as ComponentMeta<typeof ArrowRightIcon>;

const Template: ComponentStory<typeof ArrowRightIcon> = (args) => (
  <ArrowRightIcon {...args} />
);

export const Default: ComponentStory<typeof ArrowRightIcon> = Template.bind({});

Default.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
