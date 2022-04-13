import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicToggleField from "./BasicToggleField";

export default {
  title: "Components/Ui/Input/BasicToggleField",
  component: BasicToggleField,
} as ComponentMeta<typeof BasicToggleField>;

const Template: ComponentStory<typeof BasicToggleField> = (args) => (
  <BasicToggleField {...args} />
);
export const Playground: ComponentStory<typeof BasicToggleField> =
  Template.bind({});

export const Default: ComponentStory<typeof BasicToggleField> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <BasicToggleField
      id="basic-toggle-field"
      defaultChecked={false}
      disabled={false}
      readOnly={false}
      onChangeInput={onChangeInput}
      required={true}
      labelName="basic-toggle-field"
    />
  );
};
