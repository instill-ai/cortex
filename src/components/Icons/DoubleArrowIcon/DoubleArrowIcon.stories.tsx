import { ComponentStory, ComponentMeta } from "@storybook/react";
import DoubleArrowIcon from "./DoubleArrowIcon";

export default {
  title: "Components/Ui/Icon/DoubleArrowIcon",
  component: DoubleArrowIcon,
} as ComponentMeta<typeof DoubleArrowIcon>;

const Template: ComponentStory<typeof DoubleArrowIcon> = (args) => (
  <DoubleArrowIcon {...args} />
);

export const Playground: ComponentStory<typeof DoubleArrowIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
