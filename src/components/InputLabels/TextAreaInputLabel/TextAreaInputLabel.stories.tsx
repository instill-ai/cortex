import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import TextAreaInputLabel from "./TextAreaInputLabel";

export default {
  title: "Components/Ui/Input/TextAreaInputLabel",
  component: TextAreaInputLabel,
} as ComponentMeta<typeof TextAreaInputLabel>;

const Template: ComponentStory<typeof TextAreaInputLabel> = (args) => (
  <TextAreaInputLabel {...args}>Playground label</TextAreaInputLabel>
);

export const Playground = Template.bind({});

export const Default: ComponentStory<typeof TextAreaInputLabel> = () => {
  const [_, setFocus] = useState(false);
  return (
    <TextAreaInputLabel
      focus={false}
      htmlFor="default"
      answered={false}
      required={false}
      type="inset"
      onBlurHandler={() => {
        setFocus(false);
      }}
      onFocusHandler={() => {
        setFocus(true);
      }}
    >
      Default label
    </TextAreaInputLabel>
  );
};
