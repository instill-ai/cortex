import { ComponentStory, ComponentMeta } from "@storybook/react";
import AsyncArrowsIcon from "./AsyncArrowsIcon";

export default {
  title: "Components/Ui/Icon/AsyncArrowsIcon",
  component: AsyncArrowsIcon,
} as ComponentMeta<typeof AsyncArrowsIcon>;

const Template: ComponentStory<typeof AsyncArrowsIcon> = (args) => (
  <AsyncArrowsIcon {...args} />
);

export const Playground: ComponentStory<typeof AsyncArrowsIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
  color: "fill-instillGrey50",
};
