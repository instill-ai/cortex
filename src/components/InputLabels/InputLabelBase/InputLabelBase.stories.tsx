import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import InputLabelBase from "./InputLabelBase";

export default {
  title: "Components/Base/Input/InputLabelBase",
  component: InputLabelBase,
} as ComponentMeta<typeof InputLabelBase>;

const Template: ComponentStory<typeof InputLabelBase> = (args) => {
  const [_, setFocus] = useState(false);
  return <InputLabelBase {...args} setFocus={setFocus} />;
};

export const Playground: ComponentStory<typeof InputLabelBase> = Template.bind(
  {}
);

Playground.args = {
  labelFontFamily: "font-sans",
  labelFontSize: "text-base",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey50",
  labelLineHeight: "leading-[28px]",
  focus: false,
  htmlFor: "default",
  answered: false,
  required: false,
  type: "inset",
  label: "Playground label",
};
