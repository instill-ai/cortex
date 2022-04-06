import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ToggleFieldBase from "./ToggleFieldBase";

export default {
  title: "Components/Base/Input/ToggleFieldBase",
  component: ToggleFieldBase,
} as ComponentMeta<typeof ToggleFieldBase>;

const Template: ComponentStory<typeof ToggleFieldBase> = (args) => (
  <ToggleFieldBase
    {...args}
    dotColor="bg-instillGray30"
    checkedDotColor="peer-checked:bg-instillBlue30"
  />
);
export const Playground: ComponentStory<typeof ToggleFieldBase> = Template.bind(
  {}
);

export const Default: ComponentStory<typeof ToggleFieldBase> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <ToggleFieldBase
      id="toggle-field-base-playground"
      disabled={false}
      readOnly={false}
      onChangeInput={onChangeInput}
      required={true}
      labelName="toggle-field-base-playground"
      focusHighlight={true}
      borderRadius=""
      dotColor="bg-instillGray30"
      checkedDotColor="peer-checked:bg-instillBlue30"
    />
  );
};
