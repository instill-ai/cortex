import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import VisualDataOperatorIcon from "./VisualDataOperatorIcon";

export default {
  title: "Components/Ui/Icon/VisualDataOperatorIcon",
  component: VisualDataOperatorIcon,
} as ComponentMeta<typeof VisualDataOperatorIcon>;

const Template: ComponentStory<typeof VisualDataOperatorIcon> = (args) => (
  <VisualDataOperatorIcon {...args} />
);

export const Playground: ComponentStory<typeof VisualDataOperatorIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
