import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import GrpcIcon from "./GrpcIcon";

export default {
  title: "Components/Ui/Icon/GrpcIcon",
  component: GrpcIcon,
} as ComponentMeta<typeof GrpcIcon>;

const Template: ComponentStory<typeof GrpcIcon> = (args) => (
  <GrpcIcon {...args} />
);

export const Default: ComponentStory<typeof GrpcIcon> = Template.bind({});

Default.args = {
  width: "w-5",
  height: "h-5",
  color: "text-instillGray50",
  position: "my-auto",
};
