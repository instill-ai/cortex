import { ComponentStory, ComponentMeta } from "@storybook/react";
import PyTorchIcon from "./PyTorchIcon";

export default {
  title: "Components/Ui/Icon/PyTorchIcon",
  component: PyTorchIcon,
} as ComponentMeta<typeof PyTorchIcon>;

const Template: ComponentStory<typeof PyTorchIcon> = (args) => (
  <PyTorchIcon {...args} />
);

export const Playground: ComponentStory<typeof PyTorchIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
