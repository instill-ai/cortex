import { ComponentStory, ComponentMeta } from "@storybook/react";
import PixelCrossIcon from "./PixelCrossIcon";

export default {
  title: "Components/Ui/Icon/PixelCrossIcon",
  component: PixelCrossIcon,
} as ComponentMeta<typeof PixelCrossIcon>;

const Template: ComponentStory<typeof PixelCrossIcon> = (args) => (
  <PixelCrossIcon {...args} />
);

export const Playground: ComponentStory<typeof PixelCrossIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
