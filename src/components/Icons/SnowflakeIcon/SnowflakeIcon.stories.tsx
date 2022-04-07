import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SnowflakeIcon from "./SnowflakeIcon";

export default {
  title: "Components/Ui/Icon/SnowflakeIcon",
  component: SnowflakeIcon,
} as ComponentMeta<typeof SnowflakeIcon>;

const Template: ComponentStory<typeof SnowflakeIcon> = (args) => (
  <SnowflakeIcon {...args} />
);

export const Default: ComponentStory<typeof SnowflakeIcon> = Template.bind({});

Default.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
