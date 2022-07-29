import { ComponentStory, ComponentMeta } from "@storybook/react";
import CheckIcon from "./CheckIcon";

export default {
  title: "Components/Ui/Icon/CheckIcon",
  component: CheckIcon,
} as ComponentMeta<typeof CheckIcon>;

const Template: ComponentStory<typeof CheckIcon> = (args) => (
  <CheckIcon {...args} />
);

export const Playground: ComponentStory<typeof CheckIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
