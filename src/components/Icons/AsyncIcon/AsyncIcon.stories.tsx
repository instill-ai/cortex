import { ComponentStory, ComponentMeta } from "@storybook/react";
import AsyncIcon from "./AsyncIcon";

export default {
  title: "Components/Ui/Icon/AsyncIcon",
  component: AsyncIcon,
} as ComponentMeta<typeof AsyncIcon>;

const Template: ComponentStory<typeof AsyncIcon> = (args) => (
  <AsyncIcon {...args} />
);

export const Playground: ComponentStory<typeof AsyncIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
  color: "fill-instillGrey50",
};
