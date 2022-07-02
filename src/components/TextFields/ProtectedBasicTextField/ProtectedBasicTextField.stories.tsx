import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import ProtectedBasicTextField from "./ProtectedBasicTextField";

export default {
  title: "Components/Ui/Input/ProtectedBasicTextField",
  component: ProtectedBasicTextField,
} as ComponentMeta<typeof ProtectedBasicTextField>;

const Template: ComponentStory<typeof ProtectedBasicTextField> = (args) => {
  const [value, setValue] = useState("");

  const onChnageInput = (id: string, inputValue: string) => {
    setValue(inputValue);
  };

  return (
    <ProtectedBasicTextField
      {...args}
      id="protected-text-field-playground"
      label="protected-text-field-playground"
      description="this is a description for protected text field <a href='#'>setup guide</a>"
      placeholder="hello!"
      value={value}
      onChangeInput={onChnageInput}
      error={null}
    />
  );
};

export const Playground: ComponentStory<typeof ProtectedBasicTextField> =
  Template.bind({});

Playground.args = {
  required: true,
  disabled: false,
  readOnly: false,
};
