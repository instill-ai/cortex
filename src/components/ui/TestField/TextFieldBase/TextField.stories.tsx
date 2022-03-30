import React, { ChangeEvent, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextFieldBase from "./TextFieldBase";

export default {
  title: "Components/Ui/Input/TextFieldBase",
  component: TextFieldBase,
} as ComponentMeta<typeof TextFieldBase>;

export const Playground: ComponentStory<typeof TextFieldBase> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    setText(inputValue);
  };

  return (
    <TextFieldBase
      valid={text ? true : false}
      onChangeInput={onChangeInput}
      id="text-field-playground"
      labelName="playground"
      required={true}
      inputHeight={"h-[100px]"}
      inputWidth={"w-full"}
      focusHighlight={false}
      autoComplete="off"
    />
  );
};
