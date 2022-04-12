import { ComponentStory, ComponentMeta } from "@storybook/react";
import PipelineIcon from "./PipelineIcon";

export default {
  title: "Components/Ui/Icon/PipelineIcon",
  component: PipelineIcon,
} as ComponentMeta<typeof PipelineIcon>;

const Template: ComponentStory<typeof PipelineIcon> = (args) => (
  <PipelineIcon {...args} />
);

export const Playground: ComponentStory<typeof PipelineIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
