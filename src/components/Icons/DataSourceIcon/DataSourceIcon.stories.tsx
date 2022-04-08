import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DataSourceIcon from "./DataSourceIcon";

export default {
  title: "Components/Ui/Icon/DataSourceIcon",
  component: DataSourceIcon,
} as ComponentMeta<typeof DataSourceIcon>;

const Template: ComponentStory<typeof DataSourceIcon> = (args) => (
  <DataSourceIcon {...args} />
);

export const Playground: ComponentStory<typeof DataSourceIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
