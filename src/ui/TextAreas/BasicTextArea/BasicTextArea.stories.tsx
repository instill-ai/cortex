import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import BasicTextArea from "./BasicTextArea";

export default {
  title: "Components/Ui/Input/BasicTextArea",
  component: BasicTextArea,
} as ComponentMeta<typeof BasicTextArea>;

const Template: ComponentStory<typeof BasicTextArea> = (args) => {
  const [value, setValue] = useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <BasicTextArea
      {...args}
      id="text-field-playground"
      label="Playground"
      placeholder="hello"
      description="this is a description for basic textarea <a href='#'>setup guide</a>"
      autoComplete="off"
      onChange={onChange}
      value={value}
    />
  );
};

export const Playground: ComponentStory<typeof BasicTextArea> = Template.bind(
  {}
);

Playground.args = {
  required: true,
  disabled: false,
  readOnly: false,
};
