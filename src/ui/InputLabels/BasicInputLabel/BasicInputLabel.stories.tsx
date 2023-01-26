import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import BasicInputLabel from "./BasicInputLabel";

const meta: Meta<typeof BasicInputLabel> = {
  title: "Components/Ui/Input/BasicInputLabel",
  component: BasicInputLabel,
};

export default meta;

const Template: StoryFn<typeof BasicInputLabel> = (args) => {
  const [focus, setFocus] = useState(false);
  return (
    <BasicInputLabel
      {...args}
      focus={focus}
      htmlFor="default"
      answered={false}
      required={false}
      setFocus={setFocus}
    />
  );
};

export const Playground: StoryFn<typeof BasicInputLabel> = Template.bind({});

Playground.args = {
  label: "basic input label",
  type: "normal",
  message: null,
};
