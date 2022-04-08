import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArrowIconBase from ".";

export default {
  title: "Components/Base/Icon/ArrowIconBase",
  component: ArrowIconBase,
} as ComponentMeta<typeof ArrowIconBase>;

const Template: ComponentStory<typeof ArrowIconBase> = (args) => (
  <ArrowIconBase {...args} />
);

export const Default: ComponentStory<typeof ArrowIconBase> = Template.bind({});

Default.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
