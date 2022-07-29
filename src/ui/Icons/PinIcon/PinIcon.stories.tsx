import { ComponentStory, ComponentMeta } from "@storybook/react";
import PinIcon from "./PinIcon";

export default {
  title: "Components/Ui/Icon/PinIcon",
  component: PinIcon,
} as ComponentMeta<typeof PinIcon>;

const Template: ComponentStory<typeof PinIcon> = (args) => (
  <PinIcon {...args} />
);

export const Playground: ComponentStory<typeof PinIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
