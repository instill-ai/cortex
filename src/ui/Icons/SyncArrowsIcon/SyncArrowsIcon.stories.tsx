import { ComponentStory, ComponentMeta } from "@storybook/react";
import SyncArrowsIcon from "./SyncArrowsIcon";

export default {
  title: "Components/Ui/Icon/SyncArrowsIcon",
  component: SyncArrowsIcon,
} as ComponentMeta<typeof SyncArrowsIcon>;

const Template: ComponentStory<typeof SyncArrowsIcon> = (args) => (
  <SyncArrowsIcon {...args} />
);

export const Playground: ComponentStory<typeof SyncArrowsIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
  color: "fill-instillGrey50",
};
