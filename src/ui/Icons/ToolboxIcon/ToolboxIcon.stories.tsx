import { ComponentStory, ComponentMeta } from "@storybook/react";
import ToolboxIcon from "./ToolboxIcon";

export default {
  title: "Components/Ui/Icon/ToolboxIcon",
  component: ToolboxIcon,
} as ComponentMeta<typeof ToolboxIcon>;

const Template: ComponentStory<typeof ToolboxIcon> = (args) => (
  <ToolboxIcon {...args} />
);

export const Playground: ComponentStory<typeof ToolboxIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
