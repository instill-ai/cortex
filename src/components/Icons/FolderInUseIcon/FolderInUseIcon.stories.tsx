import { ComponentStory, ComponentMeta } from "@storybook/react";
import FolderInUseIcon from "./FolderInUseIcon";

export default {
  title: "Components/Ui/Icon/FolderInUseIcon",
  component: FolderInUseIcon,
} as ComponentMeta<typeof FolderInUseIcon>;

const Template: ComponentStory<typeof FolderInUseIcon> = (args) => (
  <FolderInUseIcon {...args} />
);

export const Playground: ComponentStory<typeof FolderInUseIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
