import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import EyeSlashIcon from "./EyeSlashIcon";

export default {
  title: "Components/Ui/Icon/EyeSlashIcon",
  component: EyeSlashIcon,
} as ComponentMeta<typeof EyeSlashIcon>;

const Template: ComponentStory<typeof EyeSlashIcon> = (args) => (
  <EyeSlashIcon {...args} />
);

export const Default: ComponentStory<typeof EyeSlashIcon> = Template.bind({});

Default.args = {
  width: "w-4",
  height: "h-4",
  color: "text-instillGray50",
  position: "my-auto",
};
