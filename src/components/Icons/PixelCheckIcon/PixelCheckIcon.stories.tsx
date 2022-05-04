import { ComponentStory, ComponentMeta } from "@storybook/react";
import PixelCheckIcon from "./PixelCheckIcon";

export default {
  title: "Components/Ui/Icon/PixelCheckIcon",
  component: PixelCheckIcon,
} as ComponentMeta<typeof PixelCheckIcon>;

const Template: ComponentStory<typeof PixelCheckIcon> = (args) => (
  <PixelCheckIcon {...args} />
);

export const Playground: ComponentStory<typeof PixelCheckIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
