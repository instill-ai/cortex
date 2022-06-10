import { ComponentStory, ComponentMeta } from "@storybook/react";
import GitCommitIcon from "./GitCommitIcon";

export default {
  title: "Components/Ui/Icon/GitCommitIcon",
  component: GitCommitIcon,
} as ComponentMeta<typeof GitCommitIcon>;

const Template: ComponentStory<typeof GitCommitIcon> = (args) => (
  <GitCommitIcon {...args} />
);

export const Playground: ComponentStory<typeof GitCommitIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
