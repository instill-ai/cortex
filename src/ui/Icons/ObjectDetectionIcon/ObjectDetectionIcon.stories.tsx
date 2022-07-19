import { ComponentStory, ComponentMeta } from "@storybook/react";
import ObjectDetectionIcon from "./ObjectDetectionIcon";

export default {
  title: "Components/Ui/Icon/ObjectDetectionIcon",
  component: ObjectDetectionIcon,
} as ComponentMeta<typeof ObjectDetectionIcon>;

const Template: ComponentStory<typeof ObjectDetectionIcon> = (args) => (
  <ObjectDetectionIcon {...args} />
);

export const Playground: ComponentStory<typeof ObjectDetectionIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
