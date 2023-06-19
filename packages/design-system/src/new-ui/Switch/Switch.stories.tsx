import { Meta, StoryFn } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta = {
  title: "Components/NewUi/Switch",
};

export default meta;

const Template: StoryFn = () => {
  return <Switch id="switch-test" />;
};

export const Playground: StoryFn<typeof Switch> = Template.bind({});

Playground.args = {};
