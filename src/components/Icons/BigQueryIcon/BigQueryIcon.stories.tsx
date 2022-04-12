import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BigQueryIcon from "./BigQueryIcon";

export default {
  title: "Components/Ui/Icon/BigQueryIcon",
  component: BigQueryIcon,
} as ComponentMeta<typeof BigQueryIcon>;

const Template: ComponentStory<typeof BigQueryIcon> = (args) => (
  <BigQueryIcon {...args} />
);

export const Playground: ComponentStory<typeof BigQueryIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
