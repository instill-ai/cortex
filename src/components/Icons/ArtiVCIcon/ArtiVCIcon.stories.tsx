import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArtiVCIcon from "./ArtiVCIcon";

export default {
  title: "Components/Ui/Icon/ArtiVCIcon",
  component: ArtiVCIcon,
} as ComponentMeta<typeof ArtiVCIcon>;

const Template: ComponentStory<typeof ArtiVCIcon> = (args) => (
  <ArtiVCIcon {...args} />
);

export const Playground: ComponentStory<typeof ArtiVCIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
