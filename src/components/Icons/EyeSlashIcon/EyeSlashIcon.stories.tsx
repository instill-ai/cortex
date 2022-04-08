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

export const Playground: ComponentStory<typeof EyeSlashIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
