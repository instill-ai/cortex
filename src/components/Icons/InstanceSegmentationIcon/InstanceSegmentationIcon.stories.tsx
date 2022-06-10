import { ComponentStory, ComponentMeta } from "@storybook/react";
import InstanceSegmentationIcon from "./InstanceSegmentationIcon";

export default {
  title: "Components/Ui/Icon/InstanceSegmentationIcon",
  component: InstanceSegmentationIcon,
} as ComponentMeta<typeof InstanceSegmentationIcon>;

const Template: ComponentStory<typeof InstanceSegmentationIcon> = (args) => (
  <InstanceSegmentationIcon {...args} />
);

export const Playground: ComponentStory<typeof InstanceSegmentationIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
