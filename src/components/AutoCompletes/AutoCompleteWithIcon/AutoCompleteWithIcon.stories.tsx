import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AutoCompleteWithIcon, {
  AutoCompleteWithIconOption,
} from "./AutoCompleteWithIcon";
import { GrpcIcon, HttpIcon, MongoDbIcon, SnowflakeIcon } from "../../Icons";

export default {
  title: "Components/Ui/Input/AutoCompleteWithIcon",
  component: AutoCompleteWithIcon,
} as ComponentMeta<typeof AutoCompleteWithIcon>;

const Template: ComponentStory<typeof AutoCompleteWithIcon> = (args) => {
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

  const onChangeInputHandler = (inputValue: any) => {
    console.log(inputValue);
  };

  return (
    <AutoCompleteWithIcon
      onChangeInput={onChangeInputHandler}
      options={options}
      {...args}
    />
  );
};

export const Playground: ComponentStory<typeof AutoCompleteWithIcon> =
  Template.bind({});

Playground.args = {
  error: null,
  defaultValue: null,
  disabled: false,
  readOnly: false,
  required: false,
  labelName: "autocomplete-with-icon",
  inputLabelType: "inset",
  id: "autocomplete-with-icon",
  isClearable: true,
};

export const Default: ComponentStory<typeof AutoCompleteWithIcon> = () => {
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
      error={null}
      defaultValue={options[0]}
      disabled={false}
      readOnly={false}
      required={false}
      onChangeInput={onChangeInput}
      labelName={"autocomplete-with-icon"}
      options={options}
      inputLabelType="inset"
      id="autocomplete-with-icon"
      isClearable={true}
    />
  );
};
