import { ComponentStory, ComponentMeta } from "@storybook/react";
import HuggingFaceIcon from "./HuggingFaceIcon";

export default {
  title: "Components/Ui/Icon/HuggingFaceIcon",
  component: HuggingFaceIcon,
} as ComponentMeta<typeof HuggingFaceIcon>;

const Template: ComponentStory<typeof HuggingFaceIcon> = (args) => (
  <HuggingFaceIcon {...args} />
);

export const Playground: ComponentStory<typeof HuggingFaceIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
