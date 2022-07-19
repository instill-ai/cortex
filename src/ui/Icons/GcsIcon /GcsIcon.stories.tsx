import { ComponentStory, ComponentMeta } from "@storybook/react";
import GcsIcon from "./GcsIcon";

export default {
  title: "Components/Ui/Icon/GcsIcon",
  component: GcsIcon,
} as ComponentMeta<typeof GcsIcon>;

const Template: ComponentStory<typeof GcsIcon> = (args) => (
  <GcsIcon {...args} />
);

export const Playground: ComponentStory<typeof GcsIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
