import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import EyeIcon from "./EyeIcon";

export default {
  title: "Components/Ui/Icon/EyeIcon",
  component: EyeIcon,
} as ComponentMeta<typeof EyeIcon>;

const Template: ComponentStory<typeof EyeIcon> = (args) => (
  <EyeIcon {...args} />
);

export const Default: ComponentStory<typeof EyeIcon> = Template.bind({});

Default.args = {
  width: "w-4",
  height: "h-4",
  color: "text-instillGray50",
};
