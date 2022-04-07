import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import IdIcon from "./IdIcon";

export default {
  title: "Components/Ui/Icon/IdIcon",
  component: IdIcon,
} as ComponentMeta<typeof IdIcon>;

const Template: ComponentStory<typeof IdIcon> = (args) => <IdIcon {...args} />;

export const Default: ComponentStory<typeof IdIcon> = Template.bind({});

Default.args = {
  width: "w-5",
  height: "h-5",
  color: "text-instillGray50",
  position: "my-auto",
};
