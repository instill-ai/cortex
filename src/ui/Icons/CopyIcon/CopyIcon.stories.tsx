import { ComponentStory, ComponentMeta } from "@storybook/react";
import CopyIcon from "./CopyIcon";

export default {
  title: "Components/Ui/Icon/CopyIcon",
  component: CopyIcon,
} as ComponentMeta<typeof CopyIcon>;

const Template: ComponentStory<typeof CopyIcon> = (args) => (
  <CopyIcon {...args} />
);

export const Playground: ComponentStory<typeof CopyIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
