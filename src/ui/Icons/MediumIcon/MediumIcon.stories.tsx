import { ComponentStory, ComponentMeta } from "@storybook/react";
import MediumIcon from "./MediumIcon";

export default {
  title: "Components/Ui/Icon/MediumIcon",
  component: MediumIcon,
} as ComponentMeta<typeof MediumIcon>;

const Template: ComponentStory<typeof MediumIcon> = (args) => (
  <MediumIcon {...args} />
);

export const Playground: ComponentStory<typeof MediumIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
