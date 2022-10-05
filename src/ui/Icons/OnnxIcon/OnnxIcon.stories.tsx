import { ComponentStory, ComponentMeta } from "@storybook/react";
import OnnxIcon from "./OnnxIcon";

export default {
  title: "Components/Ui/Icon/OnnxIcon",
  component: OnnxIcon,
} as ComponentMeta<typeof OnnxIcon>;

const Template: ComponentStory<typeof OnnxIcon> = (args) => (
  <OnnxIcon {...args} />
);

export const Playground: ComponentStory<typeof OnnxIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
