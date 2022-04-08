import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ModelIcon from "./ModelIcon";

export default {
  title: "Components/Ui/Icon/ModelIcon",
  component: ModelIcon,
} as ComponentMeta<typeof ModelIcon>;

const Template: ComponentStory<typeof ModelIcon> = (args) => (
  <ModelIcon {...args} />
);

export const Playground: ComponentStory<typeof ModelIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
