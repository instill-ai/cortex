import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DiscordIcon, MediumIcon } from "../../Icons";
import OutlineButton from "./OutlineButton";

export default {
  title: "Components/Ui/Button/OutlineButton",
  component: OutlineButton,
} as ComponentMeta<typeof OutlineButton>;

const Template: ComponentStory<typeof OutlineButton> = (args) => (
  <OutlineButton {...args}>Button</OutlineButton>
);

export const Playground: ComponentStory<typeof OutlineButton> = Template.bind(
  {}
);

Playground.args = {
  color: "primary",
};

export const DiscordButton: ComponentStory<typeof OutlineButton> =
  Template.bind({});

DiscordButton.args = {
  color: "primary",
  itemSpaceX: "space-x-3",
  startIcon: (
    <DiscordIcon
      width="w-5"
      height="h-5"
      color="fill-instillBlue50 group-hover:fill-instillBlue10"
      position="my-auto"
    />
  ),
};

export const MediumButton: ComponentStory<typeof OutlineButton> = Template.bind(
  {}
);

MediumButton.args = {
  color: "primary",
  itemSpaceX: "space-x-3",
  endIcon: (
    <MediumIcon
      width="w-5"
      height="h-5"
      color="fill-instillBlue50 group-hover:fill-instillBlue10"
      position="my-auto"
    />
  ),
};
