import { ComponentStory, ComponentMeta } from "@storybook/react";
import TensorFlowIcon from "./TensorFlowIcon";

export default {
  title: "Components/Ui/Icon/TensorFlowIcon",
  component: TensorFlowIcon,
} as ComponentMeta<typeof TensorFlowIcon>;

const Template: ComponentStory<typeof TensorFlowIcon> = (args) => (
  <TensorFlowIcon {...args} />
);

export const Playground: ComponentStory<typeof TensorFlowIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
