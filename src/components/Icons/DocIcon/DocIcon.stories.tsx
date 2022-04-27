import { ComponentStory, ComponentMeta } from "@storybook/react";
import DocIcon from "./DocIcon";

export default {
  title: "Components/Ui/Icon/DocIcon",
  component: DocIcon,
} as ComponentMeta<typeof DocIcon>;

const Template: ComponentStory<typeof DocIcon> = (args) => (
  <DocIcon {...args} />
);

export const Playground: ComponentStory<typeof DocIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
