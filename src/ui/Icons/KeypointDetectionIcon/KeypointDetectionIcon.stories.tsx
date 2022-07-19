import { ComponentStory, ComponentMeta } from "@storybook/react";
import KeypointDetectionIcon from "./KeypointDetectionIcon";

export default {
  title: "Components/Ui/Icon/KeypointDetectionIcon",
  component: KeypointDetectionIcon,
} as ComponentMeta<typeof KeypointDetectionIcon>;

const Template: ComponentStory<typeof KeypointDetectionIcon> = (args) => (
  <KeypointDetectionIcon {...args} />
);

export const Playground: ComponentStory<typeof KeypointDetectionIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
