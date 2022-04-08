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

export const Playground: ComponentStory<typeof EyeIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
