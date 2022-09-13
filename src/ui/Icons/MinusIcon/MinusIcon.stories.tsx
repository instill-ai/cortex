import { ComponentStory, ComponentMeta } from "@storybook/react";
import MinusIcon from "./MinusIcon";

export default {
  title: "Components/Ui/Icon/MinusIcon",
  component: MinusIcon,
} as ComponentMeta<typeof MinusIcon>;

const Template: ComponentStory<typeof MinusIcon> = (args) => (
  <MinusIcon {...args} />
);

export const Playground: ComponentStory<typeof MinusIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
