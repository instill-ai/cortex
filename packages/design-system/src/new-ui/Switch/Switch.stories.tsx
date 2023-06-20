import { Meta, StoryFn } from "@storybook/react";
import { Switch } from "./Switch";
import { Field } from "../Field";

const meta: Meta = {
  title: "Components/NewUi/Switch",
};

export default meta;

const Template: StoryFn = () => {
  return (
    <Field.Root>
      <Field.Label htmlFor="hello">Dictionary Encoding</Field.Label>
      <Switch id="hello" />
      <Field.Description>This is description</Field.Description>
    </Field.Root>
  );
};

export const Playground: StoryFn<typeof Switch> = Template.bind({});

Playground.args = {};
