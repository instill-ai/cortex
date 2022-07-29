import { ComponentStory, ComponentMeta } from "@storybook/react";
import SemanticSegmentationIcon from "./SemanticSegmentationIcon";

export default {
  title: "Components/Ui/Icon/SemanticSegmentationIcon",
  component: SemanticSegmentationIcon,
} as ComponentMeta<typeof SemanticSegmentationIcon>;

const Template: ComponentStory<typeof SemanticSegmentationIcon> = (args) => (
  <SemanticSegmentationIcon {...args} />
);

export const Playground: ComponentStory<typeof SemanticSegmentationIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
