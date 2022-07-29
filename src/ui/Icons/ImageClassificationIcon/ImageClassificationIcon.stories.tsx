import { ComponentStory, ComponentMeta } from "@storybook/react";
import ImageClassificationIcon from "./ImageClassificationIcon";

export default {
  title: "Components/Ui/Icon/ImageClassificationIcon",
  component: ImageClassificationIcon,
} as ComponentMeta<typeof ImageClassificationIcon>;

const Template: ComponentStory<typeof ImageClassificationIcon> = (args) => (
  <ImageClassificationIcon {...args} />
);

export const Playground: ComponentStory<typeof ImageClassificationIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
