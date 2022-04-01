import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProtectedBasicTextField from "./ProtectedBasicTextField";

export default {
  title: "Components/Ui/Input/ProtectedBasicTextField",
  component: ProtectedBasicTextField,
} as ComponentMeta<typeof ProtectedBasicTextField>;

export const Playground: ComponentStory<
  typeof ProtectedBasicTextField
> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <ProtectedBasicTextField
      valid={text ? true : false}
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
