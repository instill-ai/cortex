import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArrowDownIcon from "./ArrowDownIcon";

export default {
  title: "Components/Ui/Icon/ArrowDownIcon",
  component: ArrowDownIcon,
} as ComponentMeta<typeof ArrowDownIcon>;

const Template: ComponentStory<typeof ArrowDownIcon> = (args) => (
  <ArrowDownIcon {...args} />
);

export const Playground: ComponentStory<typeof ArrowDownIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
