import { ComponentStory, ComponentMeta } from "@storybook/react";
import SyncIcon from "./SyncIcon";

export default {
  title: "Components/Ui/Icon/SyncIcon",
  component: SyncIcon,
} as ComponentMeta<typeof SyncIcon>;

const Template: ComponentStory<typeof SyncIcon> = (args) => (
  <SyncIcon {...args} />
);

export const Playground: ComponentStory<typeof SyncIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
  color: "fill-instillGrey50",
};
