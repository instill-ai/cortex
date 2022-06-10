import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import BasicInputLabel from "./BasicInputLabel";

export default {
  title: "Components/Ui/Input/BasicInputLabel",
  component: BasicInputLabel,
} as ComponentMeta<typeof BasicInputLabel>;

const Template: ComponentStory<typeof BasicInputLabel> = (args) => {
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

export const Playground: ComponentStory<typeof BasicInputLabel> = Template.bind(
  {}
);

Playground.args = {
  label: "basic input label",
  type: "normal",
};
