import { ComponentStory, ComponentMeta } from "@storybook/react";
import ModelInstanceIcon from "./ModelInstanceIcon";

export default {
  title: "Components/Ui/Icon/ModelInstanceIcon",
  component: ModelInstanceIcon,
} as ComponentMeta<typeof ModelInstanceIcon>;

const Template: ComponentStory<typeof ModelInstanceIcon> = (args) => (
  <ModelInstanceIcon {...args} />
);

export const Playground: ComponentStory<typeof ModelInstanceIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
