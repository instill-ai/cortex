import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ChevronDownIcon from "./ChevronDownIcon";

export default {
  title: "Components/Ui/Icon/ChevronDownIcon",
  component: ChevronDownIcon,
} as ComponentMeta<typeof ChevronDownIcon>;

const Template: ComponentStory<typeof ChevronDownIcon> = (args) => (
  <ChevronDownIcon {...args} />
);

export const Default: ComponentStory<typeof ChevronDownIcon> = Template.bind(
  {}
);

Default.args = {
  width: "w-4",
  height: "h-4",
  color: "text-instillGray50",
  position: "my-auto",
};
