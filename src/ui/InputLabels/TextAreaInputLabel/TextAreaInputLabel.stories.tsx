import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import TextAreaInputLabel from "./TextAreaInputLabel";

const meta: Meta<typeof TextAreaInputLabel> = {
  title: "Components/Ui/Input/TextAreaInputLabel",
  component: TextAreaInputLabel,
};

export default meta;

const Template: StoryFn<typeof TextAreaInputLabel> = (args) => {
  const [focus, setFocus] = useState(false);
  return (
    <TextAreaInputLabel
      {...args}
      setFocus={setFocus}
      focus={focus}
      htmlFor="default"
      answered={false}
      required={false}
    />
  );
};

export const Playground: StoryFn<typeof TextAreaInputLabel> = Template.bind({});

Playground.args = {
  type: "normal",
  label: "text area lable",
  message: null,
};
