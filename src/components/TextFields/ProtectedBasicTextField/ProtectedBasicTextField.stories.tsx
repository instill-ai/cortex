import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProtectedBasicTextField from "./ProtectedBasicTextField";

export default {
  title: "Components/Ui/Input/ProtectedBasicTextField",
  component: ProtectedBasicTextField,
} as ComponentMeta<typeof ProtectedBasicTextField>;

const Template: ComponentStory<typeof ProtectedBasicTextField> = (args) => (
  <ProtectedBasicTextField {...args} />
);

export const Playground: ComponentStory<typeof ProtectedBasicTextField> =
  Template.bind({});

Playground.args = {
  labelName: "basic-protected-textfield-playground",
};

export const Default: ComponentStory<typeof ProtectedBasicTextField> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <ProtectedBasicTextField
      error={null}
      onChangeInput={onChangeInput}
      id="text-field-playground"
      labelName="playground"
      required={true}
      autoComplete="off"
      disabled={false}
      placeholder="hello!"
      readOnly={false}
    />
  );
};
