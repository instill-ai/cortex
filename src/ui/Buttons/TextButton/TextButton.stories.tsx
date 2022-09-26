import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArrowRightIcon } from "../../Icons";
import TextButton from "./TextButton";

export default {
  title: "Components/Ui/Button/TextButton",
  component: TextButton,
} as ComponentMeta<typeof TextButton>;

const Template: ComponentStory<typeof TextButton> = (args) => (
  <TextButton {...args}>Button</TextButton>
);
export const Playground: ComponentStory<typeof TextButton> = Template.bind({});

Playground.args = {
  color: "primary",
};

export const withIcon: ComponentStory<typeof TextButton> = Template.bind({});

withIcon.args = {
  color: "primary",
  itemSpaceX: "space-x-5",
  endIcon: (
    <ArrowRightIcon
      width="w-4"
      height="h-4"
      color="fill-instillBlue50 group-hover:fill-instillBlue80"
      position="my-auto"
    />
  ),
};
