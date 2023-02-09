import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import InputLabelBase from "./InputLabelBase";

const meta: Meta<typeof InputLabelBase> = {
  title: "Components/Base/Input/InputLabelBase",
  component: InputLabelBase,
};

export default meta;

const Template: StoryFn<typeof InputLabelBase> = (args) => {
  const [, setFocus] = useState(false);
  return <InputLabelBase {...args} setFocus={setFocus} />;
};

export const Playground: StoryFn<typeof InputLabelBase> = Template.bind({});

Playground.args = {
  labelFontFamily: "font-sans",
  labelFontSize: "text-base",
  labelFontWeight: "font-normal",
  labelTextColor: "text-instillGrey50",
  labelLineHeight: "leading-[28px]",
  messageFontSize: "text-xs",
  messageTextColor: "text-instillGrey70",
  messageFontFamily: "font-sans",
  messageFontWeight: "font-normal",
  messageLineHeight: "",
  focus: false,
  htmlFor: "default",
  answered: false,
  required: false,
  type: "inset",
  label: "Playground label",
  message: null,
};
