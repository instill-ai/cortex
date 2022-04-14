import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import InputLabelBase from "./InputLabelBase";

export default {
  title: "Components/Base/Input/InputLabelBase",
  component: InputLabelBase,
} as ComponentMeta<typeof InputLabelBase>;

const Template: ComponentStory<typeof InputLabelBase> = (args) => (
  <InputLabelBase {...args}>Playground label</InputLabelBase>
);

export const Playground = Template.bind({});

export const Default: ComponentStory<typeof InputLabelBase> = () => {
  const [_, setFocus] = useState(false);

  return (
    <InputLabelBase
      labelFontFamily="font-sans"
      labelFontSize="text-base"
      labelFontWeight="font-normal"
      labelTextColor="text-instillGray50"
      labelLineHeight="leading-[28px]"
      focus={false}
      htmlFor="default"
      answered={false}
      required={false}
      type="inset"
      onBlurHandler={() => setFocus(false)}
      onFocusHandler={() => setFocus(true)}
    >
      Default label
    </InputLabelBase>
  );
};
