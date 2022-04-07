import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import HttpIcon from "./HttpIcon";

export default {
  title: "Components/Ui/Icon/HttpIcon",
  component: HttpIcon,
} as ComponentMeta<typeof HttpIcon>;

const Template: ComponentStory<typeof HttpIcon> = (args) => (
  <HttpIcon {...args} />
);

export const Default: ComponentStory<typeof HttpIcon> = Template.bind({});

Default.args = {
  width: "w-5",
  height: "h-5",
  color: "text-instillGray50",
  position: "my-auto",
};
