import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import SingleSelectBase from "./SingleSelectBase";
import { SingleSelectOption } from "./SingleSelectBase";
import { basicInputDescriptionConfig } from "../../InputDescriptions";
import { Nullable } from "../../../types/general";
import { basicSingleSelectConfig } from "../BasicSingleSelect";

const meta: Meta<typeof SingleSelectBase> = {
  title: "Components/Base/Input/SingleSelectBase",
  component: SingleSelectBase,
};

export default meta;

const Template: StoryFn<typeof SingleSelectBase> = (args) => {
  const optionsWithoutIcon: SingleSelectOption[] = [
    {
      value: "grpc",
      label: "gRPC-gRPC-gRPC-gRPC-gRPC-gRPC-gRPC-gRPC-gRPC-",
    },
    {
      value: "http",
      label: "HTTP",
    },
    {
      value: "snowflake",
      label: "Snowflake",
    },
    {
      value: "mongodb",
      label: "MongoDB",
    },
  ];

  const onChange = (option: Nullable<SingleSelectOption>) => {
    setValue(option);
  };

  const [value, setValue] = useState<SingleSelectOption | null>(null);

  return (
    <SingleSelectBase
      {...args}
      onChange={onChange}
      options={optionsWithoutIcon}
      value={value}
    />
  );
};

export const Playground: StoryFn<typeof SingleSelectBase> = Template.bind({});

Playground.args = {
  disabled: false,
  readOnly: false,
  required: false,
  additionalMessageOnLabel: null,
  description: "this is a description for auth complete with Icon",
  label: "Single select playground",
  id: "single-select-with-icon",
  ...basicSingleSelectConfig,
  ...basicInputDescriptionConfig,
};
