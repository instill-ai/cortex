import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import BasicInputLabel from "./BasicInputLabel";

export default {
  title: "Components/Ui/Input/BasicInputLabel",
  component: BasicInputLabel,
} as ComponentMeta<typeof BasicInputLabel>;

const Template: ComponentStory<typeof BasicInputLabel> = (args) => (
  <BasicInputLabel {...args}>Playground label</BasicInputLabel>
);

export const Playground = Template.bind({});

export const Default: ComponentStory<typeof BasicInputLabel> = () => {
  const [_, setFocus] = useState(false);
  <BasicInputLabel
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
  </BasicInputLabel>;
};
