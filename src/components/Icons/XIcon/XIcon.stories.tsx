import { ComponentStory, ComponentMeta } from "@storybook/react";
import XIcon from "./XIcon";

export default {
  title: "Components/Ui/Icon/XIcon",
  component: XIcon,
} as ComponentMeta<typeof XIcon>;

const Template: ComponentStory<typeof XIcon> = (args) => <XIcon {...args} />;

export const Playground: ComponentStory<typeof XIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
