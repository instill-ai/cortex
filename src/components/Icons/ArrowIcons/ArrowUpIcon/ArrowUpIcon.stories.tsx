import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArrowUpIcon from "./ArrowUpIcon";

export default {
  title: "Components/Ui/Icon/ArrowUpIcon",
  component: ArrowUpIcon,
} as ComponentMeta<typeof ArrowUpIcon>;

const Template: ComponentStory<typeof ArrowUpIcon> = (args) => (
  <ArrowUpIcon {...args} />
);

export const Playground: ComponentStory<typeof ArrowUpIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
