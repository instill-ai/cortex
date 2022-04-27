import { ComponentStory, ComponentMeta } from "@storybook/react";
import FolderPlusIcon from "./FolderPlusIcon";

export default {
  title: "Components/Ui/Icon/FolderPlusIcon",
  component: FolderPlusIcon,
} as ComponentMeta<typeof FolderPlusIcon>;

const Template: ComponentStory<typeof FolderPlusIcon> = (args) => (
  <FolderPlusIcon {...args} />
);

export const Playground: ComponentStory<typeof FolderPlusIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
