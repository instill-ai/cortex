import * as React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/NewUi/Input/Textarea",
  component: Textarea,
};

export default meta;

const Template: StoryFn<typeof Textarea> = (args) => {
  const [value, setValue] = React.useState("");
  return (
    <Textarea
      placeholder="Input..."
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const Playground: StoryFn<typeof Textarea> = Template.bind({});

Playground.args = {};
