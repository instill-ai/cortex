import { ComponentStory, ComponentMeta } from "@storybook/react";
import GitBranchIcon from "./GitBranchIcon";

export default {
  title: "Components/Ui/Icon/GitBranchIcon",
  component: GitBranchIcon,
} as ComponentMeta<typeof GitBranchIcon>;

const Template: ComponentStory<typeof GitBranchIcon> = (args) => (
  <GitBranchIcon {...args} />
);

export const Playground: ComponentStory<typeof GitBranchIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
