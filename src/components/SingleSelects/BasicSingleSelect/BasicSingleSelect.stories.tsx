import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { GrpcIcon, HttpIcon, MongoDbIcon, SnowflakeIcon } from "../../Icons";
import { SingleSelectOption } from "../SingleSelectBase";
import BasicSingleSelect from "./BasicSingleSelect";

export default {
  title: "Components/Ui/Input/BasicSingleSelect",
  component: BasicSingleSelect,
} as ComponentMeta<typeof BasicSingleSelect>;

const Template: ComponentStory<typeof BasicSingleSelect> = (args) => {
  const options: SingleSelectOption[] = [
    {
      value: "grpc",
      label: "gRPC",
      startIcon: (
        <GrpcIcon
          color="text-instillGrey95"
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
          color="text-instillGrey95"
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
    <BasicSingleSelect
      {...args}
      id="autocomplete-with-icon"
      instanceId="autocomplete-with-icon"
      onChangeInput={onChangeInputHandler}
      options={options}
      additionalMessageOnLabel={null}
      error={null}
      description="this is a description for auth complete with Icon <a href='#'>setup guide</a>"
      label="autocomplete-with-icon"
      menuPlacement="auto"
    />
  );
};

export const Playground: ComponentStory<typeof BasicSingleSelect> =
  Template.bind({});

Playground.args = {
  disabled: false,
  readOnly: false,
  required: false,
};
