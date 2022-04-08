import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  AutoCompleteWithIcon,
  AutoCompleteWithIconOption,
} from "./AutoCompleteWithIcon";
import { GrpcIcon, HttpIcon, MongoDbIcon, SnowflakeIcon } from "../../Icons";

export default {
  title: "Components/Ui/Input/AutoCompleteWithIcon",
  component: AutoCompleteWithIcon,
} as ComponentMeta<typeof AutoCompleteWithIcon>;

const Template: ComponentStory<typeof AutoCompleteWithIcon> = (args) => (
  <AutoCompleteWithIcon {...args} />
);

export const Playground: ComponentStory<typeof AutoCompleteWithIcon> =
  Template.bind({});

Playground.args = {};

export const Default: ComponentStory<typeof AutoCompleteWithIcon> = () => {
  const [text, setText] = useState<string>("");

  const onChangeInput = (inputValue: string) => {
    console.log(inputValue);
  };

  const options: AutoCompleteWithIconOption[] = [
    {
      value: "grpc",
      label: "gRPC",
      startIcon: (
        <GrpcIcon
          color="text-instillGray95"
          width="w-[30px]"
          height="h-[30px]"
          position="m-auto"
        />
      ),
    },
    {
      value: "http",
      label: "HTTP",
      startIcon: (
        <HttpIcon
          color="text-instillGray95"
          width="w-[30px]"
          height="h-[30px]"
          position="m-auto"
        />
      ),
    },
    {
      value: "snowflake",
      label: "Snowflake",
      startIcon: (
        <SnowflakeIcon width="w-[30px]" height="h-[30px]" position="m-auto" />
      ),
    },
    {
      value: "mongodb",
      label: "MongoDB",
      startIcon: (
        <MongoDbIcon width="w-[30px]" height="h-[30px]" position="m-auto" />
      ),
    },
  ];

  return (
    <AutoCompleteWithIcon
      defaultValue={options[0]}
      disabled={false}
      readOnly={false}
      required={false}
      onChangeInput={onChangeInput}
      labelName={"autocomplete-with-icon"}
      options={options}
      inputLabelType="inset"
      id="autocomplete-with-icon"
    />
  );
};
