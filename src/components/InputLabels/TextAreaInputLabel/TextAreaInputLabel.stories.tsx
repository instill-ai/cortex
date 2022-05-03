import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import TextAreaInputLabel from "./TextAreaInputLabel";

export default {
  title: "Components/Ui/Input/TextAreaInputLabel",
  component: TextAreaInputLabel,
} as ComponentMeta<typeof TextAreaInputLabel>;

const Template: ComponentStory<typeof TextAreaInputLabel> = (args) => {
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

export const Playground: ComponentStory<typeof TextAreaInputLabel> =
  Template.bind({});

Playground.args = {
  type: "inset",
  label: "text area lable",
};
